package com.canaristar.backend.controller;

import com.canaristar.backend.entity.Carousel;
import com.canaristar.backend.service.carousel.CarouselService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/carousel")
public class CarouselController {

    private static final Logger logger = LoggerFactory.getLogger(CarouselController.class);

    @Autowired
    private CarouselService carouselService;

    @GetMapping
    public ResponseEntity<?> getAllCarousels() {
        List<Carousel> carousels = carouselService.findAll();

        if (carousels.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(carousels);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCarouselById(@PathVariable String id) {
        Carousel carousel = carouselService.findById(id);

        if (carousel == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(carousel);
    }

    @GetMapping("/featured")
    public ResponseEntity<?> getFeaturedCarousels() {
        List<Carousel> carousels = carouselService.findByFeatured(true);

        if (carousels.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(carousels);
    }

    @GetMapping("/all/between")
    public ResponseEntity<?> getCarouselsByCreatedAtBetween(
            @RequestParam String start,
            @RequestParam String end
    ) {
        try {
            LocalDateTime s = LocalDateTime.parse(start);
            LocalDateTime e = LocalDateTime.parse(end);

            List<Carousel> list = carouselService.findByCreatedAtBetween(s, e);

            if (list.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.ok(list);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Invalid date format");
        }
    }
}
