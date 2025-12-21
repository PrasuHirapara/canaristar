package com.canaristar.backend.service.orders;

import com.canaristar.backend.entity.IdempotencyRecord;
import com.canaristar.backend.entity.LogDay;
import com.canaristar.backend.entity.orders.Orders;
import com.canaristar.backend.enums.OrdersType;
import com.canaristar.backend.repository.IdempotencyRepository;
import com.canaristar.backend.repository.LogDayRepository;
import com.canaristar.backend.repository.OrdersRepository;
import com.canaristar.backend.service.userOrders.UserOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersServiceImpl implements OrdersService {

    private static final Logger logger = LoggerFactory.getLogger(OrdersServiceImpl.class);
    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private LogDayRepository logDayRepository;

    @Autowired
    private IdempotencyRepository idempotencyRepository;

    @Autowired
    private UserOrdersService userOrdersService;

    @Override
    public Orders createOrderIdempotent(
            Orders orders,
            String idempotencyKey,
            String requestHash
    ) {

        logger.info("createOrderIdempotent called userId={} idempotencyKey={}", orders.getUserId(), idempotencyKey);

        Optional<IdempotencyRecord> recordOpt = idempotencyRepository.findByKey(idempotencyKey);

        if (recordOpt.isPresent()) {
            IdempotencyRecord record = recordOpt.get();

            if (!record.getRequestHash().equals(requestHash)) {
                logger.error("Idempotency key reused with different payload for key={}", idempotencyKey);
                throw new RuntimeException("Idempotency key reused with different payload");
            }

            Orders existing = ordersRepository
                    .findById(record.getResponseOrderId())
                    .orElseThrow();

            logOrderEvent("Idempotency hit - returning existing order", existing.getId(), existing.getUserId(), null);

            return existing;
        }

        orders.setIdempotencyKey(idempotencyKey);
        orders.setOrdersType(OrdersType.STARTED);

        Orders saved = ordersRepository.save(orders);
        userOrdersService.addOrderToUser(saved.getUserId(), saved);

        IdempotencyRecord record = new IdempotencyRecord();
        record.setKey(idempotencyKey);
        record.setRequestHash(requestHash);
        record.setResponseOrderId(saved.getId());

        idempotencyRepository.save(record);

        logOrderEvent("Order created", saved.getId(), saved.getUserId(), null);

        return saved;
    }

    @Override
    public Orders updateOrder(String id, Orders req) {
        Orders old = findOrderById(id);

        if (old == null) return null;

        old.setRemarks(req.getRemarks());
        old.setOrdersType(req.getOrdersType());
        old.setUpdatedAt(LocalDateTime.now());

        Orders updated = ordersRepository.save(old);
        userOrdersService.updateUserOrder(old.getUserId(), updated);

        logOrderEvent("Order updated", old.getId(), old.getUserId(), updated.getRazorpayPaymentId());

        return updated;
    }

    private void logOrderEvent(String message, String orderId, String userId, String paymentId) {
        try {
            LocalDate today = LocalDate.now();
            String dateStr = today.format(DATE_FMT);

            Optional<LogDay> existing = logDayRepository.findByDate(dateStr);
            LogDay logDay;

            if (existing.isPresent()) {
                logDay = existing.get();
            } else {
                logDay = new LogDay();
                logDay.setDate(dateStr);
            }

            LogDay.LogEntryItem entry = new LogDay.LogEntryItem(
                    LocalDateTime.now(),
                    "OrderService",
                    message,
                    orderId,
                    paymentId,
                    null
            );

            logDay.getEntries().add(entry);
            logDayRepository.save(logDay);
        } catch (Exception e) {
            logger.warn("Failed to persist order log: {}", e.getMessage());
        }
    }

    @Override
    public Orders findOrderById(String id) {
        return ordersRepository.findById(id).orElse(null);
    }

    @Override
    public List<Orders> findOrdersByUserId(String userId) {
        return ordersRepository.findByUserId(userId);
    }

    @Override
    public List<Orders> findAllOrders() {
        return ordersRepository.findAll();
    }

    @Override
    public List<Orders> findOrdersBetween(LocalDateTime start, LocalDateTime end) {
        return ordersRepository.findByCreatedAtBetween(start, end);
    }

    @Override
    public List<Orders> findOrdersByOrderType(OrdersType ordersType) {
        return ordersRepository.findByOrdersType(ordersType);
    }
}
