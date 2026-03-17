package com.campusconnect.common;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ApiError> illegalArgument(IllegalArgumentException ex, HttpServletRequest req) {
		return ResponseEntity.badRequest().body(ApiError.of(400, "Bad Request", ex.getMessage(), req.getRequestURI()));
	}

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ApiError> badCredentials(BadCredentialsException ex, HttpServletRequest req) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
			.body(ApiError.of(401, "Unauthorized", "Invalid credentials", req.getRequestURI()));
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiError> validation(MethodArgumentNotValidException ex, HttpServletRequest req) {
		String msg = ex.getBindingResult().getAllErrors().stream()
			.findFirst()
			.map(e -> e.getDefaultMessage())
			.orElse("Validation error");
		return ResponseEntity.badRequest().body(ApiError.of(400, "Bad Request", msg, req.getRequestURI()));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiError> fallback(Exception ex, HttpServletRequest req) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.body(ApiError.of(500, "Internal Server Error", "Unexpected error", req.getRequestURI()));
	}
}

