package com.canaristar.backend.service.orders;

import com.canaristar.backend.entity.orders.Orders;
import com.canaristar.backend.enums.OrdersType;

import java.time.LocalDateTime;
import java.util.List;

public interface OrdersService {

    Orders createOrderIdempotent(Orders orders, String idempotencyKey, String requestHash);
    Orders updateOrder(String id, Orders req);
    Orders findOrderById(String id);
    List<Orders> findOrdersByUserId(String userId);
    List<Orders> findAllOrders();
    List<Orders> findOrdersBetween(LocalDateTime start, LocalDateTime end);
    List<Orders> findOrdersByOrderType(OrdersType ordersType);
}
