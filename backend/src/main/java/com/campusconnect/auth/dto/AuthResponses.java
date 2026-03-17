package com.campusconnect.auth.dto;

import com.campusconnect.user.Role;
import java.util.Set;

public class AuthResponses {
	public record AuthResponse(
		String token,
		String email,
		Set<Role> roles
	) {}
}

