package com.campusconnect.auth;

import com.campusconnect.security.JwtService;
import com.campusconnect.security.UserPrincipal;
import com.campusconnect.user.Role;
import com.campusconnect.user.UserAccount;
import com.campusconnect.user.UserAccountRepository;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
	private final UserAccountRepository users;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtService jwt;

	@Transactional
	public UserAccount register(String email, String password) {
		if (users.existsByEmailIgnoreCase(email)) {
			throw new IllegalArgumentException("Email already registered");
		}

		UserAccount u = new UserAccount();
		u.setEmail(email.trim().toLowerCase());
		u.setPasswordHash(passwordEncoder.encode(password));
		u.setRoles(Set.of(Role.STUDENT));
		return users.save(u);
	}

	public AuthResult login(String email, String password) {
		Authentication auth = authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(email.trim().toLowerCase(), password)
		);

		UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
		return new AuthResult(jwt.issueToken(principal), principal.email(), principal.roles());
	}

	public record AuthResult(String token, String email, Set<Role> roles) {}
}

