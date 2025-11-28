package com.canaristar.backend.entity;
import com.canaristar.backend.enums.ContactUsStatus;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Document(collection = "contact-us")
@Data
public class ContactUs {
    @Id
    private String id;
    @NotBlank
    private String email;
    @NotBlank
    private String name;
    @NotBlank
    private String mobile;
    @NotBlank
    private String title;
    private String description;
    private List<String> imageUrls = new LinkedList<>();

    private ContactUsStatus status;

    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

//       query solution
//       key=title and value=description
    private Map<String, String> reply =  new HashMap<String, String>();
}