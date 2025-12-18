package com.canaristar.backend.service.idempotencyService;

import com.canaristar.backend.entity.IdempotencyRecord;
import com.canaristar.backend.repository.IdempotencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Optional;

@Service
public class IdempotencyServiceImpl implements IdempotencyService {

    @Autowired
    private IdempotencyRepository repository;

    @Override
    public Optional<IdempotencyRecord> findByKey(String key) {
        return repository.findByKey(key);
    }

    @Override
    public boolean isSameRequest(IdempotencyRecord record, String payload) {
        return record.getRequestHash().equals(hash(payload));
    }

    @Override
    public IdempotencyRecord save(String key, String payload, String responseOrderId) {
        IdempotencyRecord record = new IdempotencyRecord();
        record.setKey(key);
        record.setRequestHash(hash(payload));
        record.setResponseOrderId(responseOrderId);
        return repository.save(record);
    }

    private String hash(String payload) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] bytes = md.digest(payload.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) sb.append(String.format("%02x", b));
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
