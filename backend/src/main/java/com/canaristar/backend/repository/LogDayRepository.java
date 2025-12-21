package com.canaristar.backend.repository;

import com.canaristar.backend.entity.LogDay;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LogDayRepository extends MongoRepository<LogDay, String> {
    Optional<LogDay> findByDate(String date);
}
