package com.canaristar.backend.service.razorpay;

import com.canaristar.backend.entity.LogDay;
import com.canaristar.backend.entity.orders.Orders;
import com.canaristar.backend.repository.LogDayRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class RazorpayPaymentService {

    private static final Logger logger = LoggerFactory.getLogger(RazorpayPaymentService.class);
    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Autowired
    private LogDayRepository logDayRepository;

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

        logPaymentEvent("Initialized razorpay order", orders.getId(), rpId);

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

        String message = ok ? "Payment verification succeeded" : "Payment verification failed";
        logPaymentEvent(message, razorpayOrderId, razorpayPaymentId);

        return ok;
    }

    private void logPaymentEvent(String message, String orderId, String paymentId) {
        try {
            LocalDate today = LocalDate.now();
            String dateStr = today.format(DATE_FMT);

            Optional<LogDay> existing = logDayRepository.findByDate(dateStr);
            LogDay logDay;

            if (existing.isPresent()) {
                logDay = existing.get();
            } else {
                logDay = new LogDay();
                logDay.setDate(dateStr);
            }

            LogDay.LogEntryItem entry = new LogDay.LogEntryItem(
                    LocalDateTime.now(),
                    "RazorpayService",
                    message,
                    orderId,
                    paymentId,
                    null
            );

            logDay.getEntries().add(entry);
            logDayRepository.save(logDay);
        } catch (Exception e) {
            logger.warn("Failed to persist payment log: {}", e.getMessage());
        }
    }
}
