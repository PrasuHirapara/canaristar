package com.canaristar.backend.repository;

import com.canaristar.backend.entity.ContactUs;
import com.canaristar.backend.enums.ContactUsStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ContactUsRepository extends MongoRepository<ContactUs, String> {
    Optional<ContactUs> findByEmail(String email);
    List<ContactUs> findAllByStatus(ContactUsStatus status);
    List<ContactUs> findByCreatedDateBetween(LocalDateTime start, LocalDateTime end);
}
