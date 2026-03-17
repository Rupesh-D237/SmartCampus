package com.campusconnect.auth;

import com.campusconnect.auth.dto.AuthRequests.LoginRequest;
import com.campusconnect.auth.dto.AuthRequests.RegisterRequest;
import com.campusconnect.auth.dto.AuthResponses.AuthResponse;
import com.campusconnect.user.UserAccount;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
	private final AuthService authService;

	@PostMapping("/register")
	@ResponseStatus(HttpStatus.CREATED)
	public AuthResponse register(@Valid @RequestBody RegisterRequest req) {
		UserAccount user = authService.register(req.email(), req.password());
		AuthService.AuthResult result = authService.login(req.email(), req.password());
		return new AuthResponse(result.token(), user.getEmail(), user.getRoles());
	}

	@PostMapping("/login")
	public AuthResponse login(@Valid @RequestBody LoginRequest req) {
		AuthService.AuthResult result = authService.login(req.email(), req.password());
		return new AuthResponse(result.token(), result.email(), result.roles());
	}
}

