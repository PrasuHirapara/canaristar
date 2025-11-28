package com.canaristar.backend.service.email;

import com.canaristar.backend.entity.ContactUs;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationOtpMail(String email, String otp) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        String subject = "Verification OTP";

        String text =
                "<h2>Your Verification Code</h2>" +
                        "<p style='font-size:18px'><strong>" + otp + "</strong></p>" +
                        "<p>Enter this OTP to verify your email.</p>";

        try {
            helper.setSubject(subject);
            helper.setText(text, true);
            helper.setTo(email);
            mailSender.send(mimeMessage);
            LOGGER.info("OTP sent to: {}", email);
        } catch (Exception e) {
            LOGGER.error("Failed to send OTP: {}", e.getMessage(), e);
            throw new MessagingException("Error while sending OTP email", e);
        }
    }

    public void sendContactUsRequestMail(ContactUs contactUs) throws MessagingException {
        String email = contactUs.getEmail();

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        String subject = "Your Contact Request Has Been Received";

        String text =
                "<h2>Contact Request Details</h2>" +
                        "<p><strong>ID:</strong> " + contactUs.getId() + "</p>" +
                        "<p><strong>Name:</strong> " + contactUs.getName() + "</p>" +
                        "<p><strong>Email:</strong> " + contactUs.getEmail() + "</p>" +
                        "<p><strong>Mobile:</strong> " + contactUs.getMobile() + "</p>" +
                        "<p><strong>Title:</strong> " + contactUs.getTitle() + "</p>" +
                        "<p><strong>Description:</strong> " + contactUs.getDescription() + "</p>" +
                        "<p><strong>Status:</strong> " + contactUs.getStatus() + "</p>" +
                        "<p><strong>Images:</strong></p>" +
                        buildImageList(contactUs) +
                        "<p>We will get back to you soon.</p>";

        try {
            helper.setSubject(subject);
            helper.setText(text, true);
            helper.setTo(email);
            mailSender.send(mimeMessage);
            LOGGER.info("Contact Us confirmation sent to: {}", email);
        } catch (Exception e) {
            LOGGER.error("Failed to send contact request email: {}", e.getMessage(), e);
            throw new MessagingException("Error while sending Contact Us email", e);
        }
    }

    public void sendContactUsResponseMail(ContactUs contactUs) throws MessagingException {
        String email = contactUs.getEmail();

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        String subject = "Response to Your Contact Request";

        String text =
                "<h2>Your Contact Request Reply</h2>" +
                        "<p><strong>ID:</strong> " + contactUs.getId() + "</p>" +
                        "<p><strong>Title:</strong> " + contactUs.getTitle() + "</p>" +
                        "<p><strong>Status:</strong> " + contactUs.getStatus() + "</p>" +
                        "<h3>Replies</h3>" +
                        buildReplyList(contactUs) +
                        "<p>If you have more questions, feel free to reply.</p>";

        try {
            helper.setSubject(subject);
            helper.setText(text, true);
            helper.setTo(email);
            mailSender.send(mimeMessage);
            LOGGER.info("Contact Us reply sent to: {}", email);
        } catch (Exception e) {
            LOGGER.error("Failed to send contact reply email: {}", e.getMessage(), e);
            throw new MessagingException("Error while sending Contact Us reply email", e);
        }
    }

    private String buildImageList(ContactUs contactUs) {
        if (contactUs.getImageUrls() == null || contactUs.getImageUrls().isEmpty()) {
            return "<p>No images</p>";
        }

        StringBuilder sb = new StringBuilder("<ul>");
        for (String url : contactUs.getImageUrls()) {
            sb.append("<li>").append(url).append("</li>");
        }
        sb.append("</ul>");

        return sb.toString();
    }

    private String buildReplyList(ContactUs contactUs) {
        if (contactUs.getReply() == null || contactUs.getReply().isEmpty()) {
            return "<p>No reply available</p>";
        }

        StringBuilder sb = new StringBuilder("<ul>");
        contactUs.getReply().forEach((key, value) ->
                sb.append("<li><strong>").append(key).append(": </strong>").append(value).append("</li>")
        );

        sb.append("</ul>");

        return sb.toString();
    }
}
