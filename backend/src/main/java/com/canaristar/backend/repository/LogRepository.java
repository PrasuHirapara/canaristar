package com.canaristar.backend.repository;

import com.canaristar.backend.entity.LogEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends MongoRepository<LogEntry, String> {
}
