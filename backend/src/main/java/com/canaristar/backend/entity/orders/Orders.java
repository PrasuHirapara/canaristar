package com.canaristar.backend.entity.orders;

import com.canaristar.backend.entity.cart.CartItem;
import com.canaristar.backend.entity.user.Address;
import com.canaristar.backend.enums.OrdersType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
@Data
public class Orders {

    @Id
    private String id;

    @NotBlank
    private String userId;

    private String idempotencyKey;

    @NotNull
    private Address address;

    @Size(min = 1)
    private List<CartItem> cartItems;

    private OrdersType ordersType = OrdersType.STARTED;

    private BigDecimal totalPrice;
    private BigDecimal discountPrice;

    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;

    private String remarks;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}
