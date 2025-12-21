package com.canaristar.backend.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class LogEntry {

    @Id
    private String id;

 // ORDER or RAZORPAY or CONTROLLER or SERVICE
    private String type;

 // INFO, ERROR, etc
    private String level;

    private String message;

 // JSON or plain text
    private String metadata;

    private LocalDateTime timestamp = LocalDateTime.now();

    private LocalDate date = LocalDate.now();

}
