package com.canaristar.backend.service.contactUs;

import com.canaristar.backend.entity.ContactUs;
import com.canaristar.backend.enums.ContactUsStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public interface ContactUsService {
    ContactUs save(ContactUs contactUs);
    ContactUs findById(String id);
    List<ContactUs> findByEmail(String email);
    List<ContactUs> findAll();
    List<ContactUs> findAllByStatus(ContactUsStatus status);
    List<ContactUs> findBetweenDates(LocalDateTime start, LocalDateTime end);
    void sendContactUsRequestMail(ContactUs contactUs);
    void sendContactUsResponseMail(ContactUs contactUs);
}
