package com.canaristar.backend.aspects;

import com.canaristar.backend.entity.LogEntry;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.util.Arrays;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Autowired
    private MongoTemplate mongoTemplate;

    private static final DateTimeFormatter COLL_FMT = DateTimeFormatter.ofPattern("yyyy_MM_dd");

    @Around("execution(public * com.canaristar.backend.controller..*(..)) || execution(public * com.canaristar.backend.service..*(..))")
    public Object logAround(ProceedingJoinPoint pjp) throws Throwable {
        MethodSignature sig = (MethodSignature) pjp.getSignature();
        String className = sig.getDeclaringType().getSimpleName();
        String methodName = sig.getName();
        String fullName = sig.getDeclaringTypeName() + "." + methodName;

        String args = Arrays.toString(pjp.getArgs());

        // try to extract request path and user information
        String path = null;
        String user = null;

        try {
            ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attrs != null) {
                HttpServletRequest request = attrs.getRequest();
                path = request.getRequestURI();
            }

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null) {
                user = auth.getName();
            }
        } catch (Exception e) {
            logger.debug("Could not extract request/auth info: {}", e.getMessage());
        }

        logger.info("Entering {} path={} user={} args={}", fullName, path, user, args);

        LogEntry entry = new LogEntry();
        entry.setType(determineType(sig.getDeclaringTypeName()));
        entry.setLevel("INFO");
        entry.setMessage("Entering: " + fullName);
        entry.setMetadata("path=" + path + ",user=" + user + ",args=" + args);

        // Save entry to date-based collection
        String coll = collectionNameFor(LocalDate.now());
        try {
            mongoTemplate.save(entry, coll);
        } catch (Exception e) {
            logger.warn("Failed to persist log entry to {}: {}", coll, e.getMessage());
        }

        Object result;

        try {
            result = pjp.proceed();

            LogEntry out = new LogEntry();
            out.setType(determineType(sig.getDeclaringTypeName()));
            out.setLevel("INFO");
            out.setMessage("Exited: " + fullName);
            out.setMetadata("path=" + path + ",user=" + user + ",result=" + (result != null ? result.toString() : "null"));
            try {
                mongoTemplate.save(out, collectionNameFor(LocalDate.now()));
            } catch (Exception e) {
                logger.warn("Failed to persist exit log: {}", e.getMessage());
            }

            return result;
        } catch (Throwable ex) {
            logger.error("Exception in {}: {}", fullName, ex.getMessage());

            LogEntry err = new LogEntry();
            err.setType(determineType(sig.getDeclaringTypeName()));
            err.setLevel("ERROR");
            err.setMessage("Exception: " + ex.getClass().getSimpleName());
            err.setMetadata("path=" + path + ",user=" + user + ",error=" + ex.getMessage());
            try {
                mongoTemplate.save(err, collectionNameFor(LocalDate.now()));
            } catch (Exception e) {
                logger.warn("Failed to persist error log: {}", e.getMessage());
            }

            throw ex;
        }
    }

    private String determineType(String className) {
        if (className.contains("controller")) return "CONTROLLER";
        if (className.contains("service")) return "SERVICE";
        return "GENERAL";
    }

    private String collectionNameFor(LocalDate date) {
        return "service_logs_" + date.format(COLL_FMT);
    }
}
