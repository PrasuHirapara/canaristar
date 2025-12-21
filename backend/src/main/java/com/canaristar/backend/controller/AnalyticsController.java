package com.canaristar.backend.controller;

import com.canaristar.backend.entity.ProductData;
import com.canaristar.backend.service.productData.ProductDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    private static final Logger logger = LoggerFactory.getLogger(AnalyticsController.class);

    @Autowired
    private ProductDataService productDataService;

    @GetMapping("/top-viewed")
    public ResponseEntity<List<ProductData>> getTopViewedProducts() {
        return ResponseEntity.ok(productDataService.getTopViewed());
    }

    @GetMapping("/top-ordered")
    public ResponseEntity<List<ProductData>> getTopOrderedProducts() {
        return ResponseEntity.ok(productDataService.getTopOrdered());
    }

    @GetMapping("/top-rated")
    public ResponseEntity<List<ProductData>> getTopRatedProducts() {
        return ResponseEntity.ok(productDataService.getTopRated());
    }
}
