package com.campusconnect.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthRequests {
	public record RegisterRequest(
		@Email @NotBlank String email,
		@NotBlank String password
	) {}

	public record LoginRequest(
		@Email @NotBlank String email,
		@NotBlank String password
	) {}
}

