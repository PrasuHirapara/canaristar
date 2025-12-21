package com.canaristar.backend.service.razorpay;

import com.canaristar.backend.entity.LogEntry;
import com.canaristar.backend.entity.orders.Orders;
import com.canaristar.backend.repository.LogRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class RazorpayPaymentService {

        private static final Logger logger = LoggerFactory.getLogger(RazorpayPaymentService.class);

        @Autowired
        private LogRepository logRepository;

        @Autowired
        private MongoTemplate mongoTemplate;

    @Value("${razorpay.key}")
    private String key;

    @Value("${razorpay.secret}")
    private String secret;

    public String initializePayment(Orders orders) throws Exception {
                logger.info("initializePayment called for orderId={}", orders.getId());

                RazorpayClient client = new RazorpayClient(key, secret);

        BigDecimal payableAmount =
                orders.getTotalPrice().subtract(orders.getDiscountPrice());

        long amountInPaise =
                payableAmount
                        .multiply(BigDecimal.valueOf(100))
                        .setScale(0, RoundingMode.HALF_UP)
                        .longValueExact();

        JSONObject request = new JSONObject();
        request.put("amount", amountInPaise);
        request.put("currency", "INR");
        request.put("receipt", orders.getId());

                Order razorpayOrder = client.orders.create(request);

                String rpId = razorpayOrder.get("id");

                LogEntry log = new LogEntry();
                log.setType("RAZORPAY");
                log.setLevel("INFO");
                log.setMessage("Initialized razorpay order");
                log.setMetadata(metadataFor(orders.getUserId(), "orderId=" + orders.getId() + ",razorpayOrderId=" + rpId));
                mongoTemplate.save(log, collectionNameFor(LocalDate.now()));

                return rpId;
    }

    public boolean verifyPayment(String razorpayOrderId,
                                 String razorpayPaymentId,
                                 String razorpaySignature) throws Exception {

        logger.info("verifyPayment called razorpayOrderId={} paymentId={}", razorpayOrderId, razorpayPaymentId);

        String payload = razorpayOrderId + "|" + razorpayPaymentId;

        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec =
                new SecretKeySpec(secret.getBytes(), "HmacSHA256");

        mac.init(secretKeySpec);
        byte[] digest = mac.doFinal(payload.getBytes());

        String generatedSignature = Hex.encodeHexString(digest);

        boolean ok = generatedSignature.equals(razorpaySignature);

                LogEntry log = new LogEntry();
                log.setType("RAZORPAY");
                log.setLevel(ok ? "INFO" : "ERROR");
                log.setMessage(ok ? "Payment verification succeeded" : "Payment verification failed");
                log.setMetadata(metadataFor(null, "razorpayOrderId=" + razorpayOrderId + ",paymentId=" + razorpayPaymentId));
                mongoTemplate.save(log, collectionNameFor(LocalDate.now()));

        return ok;
    }

        private String metadataFor(String userId, String extra) {
                String path = null;
                String user = userId;
                try {
                        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
                        if (attrs != null) path = attrs.getRequest().getRequestURI();

                        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                        if (auth != null && (user == null || user.isEmpty())) user = auth.getName();
                } catch (Exception ignored) {}

                return "path=" + path + ",user=" + user + "," + extra;
        }

        private String collectionNameFor(LocalDate date) {
                return "service_logs_" + date.format(DateTimeFormatter.ofPattern("yyyy_MM_dd"));
        }
}
