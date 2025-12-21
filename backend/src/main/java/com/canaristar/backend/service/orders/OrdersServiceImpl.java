package com.canaristar.backend.service.orders;

import com.canaristar.backend.entity.IdempotencyRecord;
import com.canaristar.backend.entity.LogEntry;
import com.canaristar.backend.entity.orders.Orders;
import com.canaristar.backend.enums.OrdersType;
import com.canaristar.backend.repository.IdempotencyRepository;
import com.canaristar.backend.repository.OrdersRepository;
import com.canaristar.backend.service.userOrders.UserOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.util.Objects;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersServiceImpl implements OrdersService {

    private static final Logger logger = LoggerFactory.getLogger(OrdersServiceImpl.class);

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

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

            LogEntry log = new LogEntry();
            log.setType("ORDER");
            log.setLevel("INFO");
            log.setMessage("Idempotency hit - returning existing order");
            log.setMetadata(metadataFor(existing.getUserId(), "orderId=" + existing.getId() + ",key=" + idempotencyKey));
            mongoTemplate.save(log, collectionNameFor(LocalDate.now()));

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

        LogEntry log = new LogEntry();
        log.setType("ORDER");
        log.setLevel("INFO");
        log.setMessage("Order created");
        log.setMetadata(metadataFor(saved.getUserId(), "orderId=" + saved.getId()));
        mongoTemplate.save(log, collectionNameFor(LocalDate.now()));

        return saved;
    }

    private String metadataFor(String userId, String extra) {
        // try to fetch request path and authenticated name if available
        String path = null;
        String user = userId;

        try {
            ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attrs != null) path = attrs.getRequest().getRequestURI();

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && (user == null || user.isEmpty())) user = auth.getName();
        } catch (Exception ignored) {}

        return "path=" + path + ",user=" + user + "," + extra;
    }

    private String collectionNameFor(LocalDate date) {
        return "service_logs_" + date.format(DateTimeFormatter.ofPattern("yyyy_MM_dd"));
    }

    @Override
    public Orders updateOrder(String id, Orders req) {
        Orders old = findOrderById(id);

        if (old == null) return null;

        logger.info("updateOrder called orderId={}", id);

        old.setRemarks(req.getRemarks());
        old.setOrdersType(req.getOrdersType());
        old.setUpdatedAt(LocalDateTime.now());

        Orders updated = ordersRepository.save(old);
        userOrdersService.updateUserOrder(old.getUserId(), updated);

        LogEntry log = new LogEntry();
        log.setType("ORDER");
        log.setLevel("INFO");
        log.setMessage("Order updated");
        log.setMetadata(metadataFor(updated.getUserId(), "orderId=" + updated.getId()));
        mongoTemplate.save(log, collectionNameFor(LocalDate.now()));

        return updated;
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
