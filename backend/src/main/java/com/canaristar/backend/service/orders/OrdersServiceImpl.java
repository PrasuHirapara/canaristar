package com.canaristar.backend.service.orders;

import com.canaristar.backend.entity.IdempotencyRecord;
import com.canaristar.backend.entity.orders.Orders;
import com.canaristar.backend.enums.OrdersType;
import com.canaristar.backend.repository.IdempotencyRepository;
import com.canaristar.backend.repository.OrdersRepository;
import com.canaristar.backend.service.userOrders.UserOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersServiceImpl implements OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

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

        Optional<IdempotencyRecord> recordOpt = idempotencyRepository.findByKey(idempotencyKey);

        if (recordOpt.isPresent()) {
            IdempotencyRecord record = recordOpt.get();

            if (!record.getRequestHash().equals(requestHash)) {
                throw new RuntimeException("Idempotency key reused with different payload");
            }

            return ordersRepository
                    .findById(record.getResponseOrderId())
                    .orElseThrow();
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
