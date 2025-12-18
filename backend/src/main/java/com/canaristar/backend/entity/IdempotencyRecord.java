package com.canaristar.backend.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "idempotency_keys")
@Data
public class IdempotencyRecord {

    @Id
    private String id;
    private String key;
    private String requestHash;
    private String responseOrderId;
    private LocalDateTime createdAt = LocalDateTime.now();
}
