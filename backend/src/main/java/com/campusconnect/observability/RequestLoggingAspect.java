package com.campusconnect.observability;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class RequestLoggingAspect {
	@Around("within(@org.springframework.web.bind.annotation.RestController *)")
	public Object timeController(ProceedingJoinPoint pjp) throws Throwable {
		long start = System.currentTimeMillis();
		try {
			return pjp.proceed();
		} finally {
			long ms = System.currentTimeMillis() - start;
			log.info("api {} took {}ms", pjp.getSignature().toShortString(), ms);
		}
	}
}

