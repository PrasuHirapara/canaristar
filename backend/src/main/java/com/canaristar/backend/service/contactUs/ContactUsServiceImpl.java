package com.canaristar.backend.service.contactUs;

import com.canaristar.backend.entity.ContactUs;
import com.canaristar.backend.enums.ContactUsStatus;
import com.canaristar.backend.repository.ContactUsRepository;
import com.canaristar.backend.service.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
public class ContactUsServiceImpl implements ContactUsService {

    @Autowired
    private ContactUsRepository contactUsRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public ContactUs save(ContactUs contactUs) {
        contactUs.setCreatedDate(LocalDateTime.now());
        contactUs.setUpdatedDate(LocalDateTime.now());

        return contactUsRepository.save(contactUs);
    }

    @Override
    public ContactUs findById(String id) {
        return contactUsRepository.findById(id).orElse(null);
    }

    @Override
    public List<ContactUs> findByEmail(String email) {
        return Collections.singletonList(contactUsRepository.findByEmail(email).orElse(null));
    }

    @Override
    public List<ContactUs> findAll() {
        return contactUsRepository.findAll();
    }

    @Override
    public List<ContactUs> findAllByStatus(ContactUsStatus status) {
        return contactUsRepository.findAllByStatus(status);
    }

    @Override
    public List<ContactUs> findBetweenDates(LocalDateTime start, LocalDateTime end) {
        return contactUsRepository.findByCreatedDateBetween(start, end);
    }

    @Override
    public void sendContactUsRequestMail(ContactUs contactUs) {
        try {
            emailService.sendContactUsRequestMail(contactUs);
        } catch (Exception e) {
            throw new RuntimeException("Error request sending email: " + e.getMessage());
        }
    }

    @Override
    public void sendContactUsResponseMail(ContactUs contactUs) {
        try {
            emailService.sendContactUsResponseMail(contactUs);
        } catch (Exception e) {
            throw new RuntimeException("Error response sending email: " + e.getMessage());
        }
    }
}
