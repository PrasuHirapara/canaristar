package com.canaristar.backend.service.razorpay;

import com.canaristar.backend.entity.orders.Orders;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class RazorpayPaymentService {

    @Value("${razorpay.key}")
    private String key;

    @Value("${razorpay.secret}")
    private String secret;

    public String initializePayment(Orders orders) throws Exception {

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

        return razorpayOrder.get("id");
    }

    public boolean verifyPayment(String razorpayOrderId,
                                 String razorpayPaymentId,
                                 String razorpaySignature) throws Exception {

        String payload = razorpayOrderId + "|" + razorpayPaymentId;

        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec =
                new SecretKeySpec(secret.getBytes(), "HmacSHA256");

        mac.init(secretKeySpec);
        byte[] digest = mac.doFinal(payload.getBytes());

        String generatedSignature = Hex.encodeHexString(digest);

        return generatedSignature.equals(razorpaySignature);
    }
}
