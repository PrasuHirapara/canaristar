package com.canaristar.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "logs")
public class LogDay {

    @Id
    private String date; // Format: yyyy-MM-dd

    private List<LogEntryItem> entries = new ArrayList<>();

    @Data
    @AllArgsConstructor
    public static class LogEntryItem {
        private LocalDateTime timestamp;
        private String source;      // "OrderService", "RazorpayService"
        private String message;
        private String orderId;     // Optional
        private String paymentId;   // Optional
        private String metadata;    // Additional context
    }
}
