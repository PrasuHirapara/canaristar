package com.canaristar.backend.service.idempotencyService;
import com.canaristar.backend.entity.IdempotencyRecord;

import java.util.Optional;

public interface IdempotencyService {
    Optional<IdempotencyRecord> findByKey(String key);
    boolean isSameRequest(IdempotencyRecord record, String payload);
    IdempotencyRecord save(String key, String payload, String orderId);
}
