package com.campusconnect.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
	private final SecretKey secretKey;
	private final long expirationSeconds;

	public JwtService(
		@Value("${app.security.jwt.secret}") String secret,
		@Value("${app.security.jwt.expiration-seconds}") long expirationSeconds
	) {
		this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
		this.expirationSeconds = expirationSeconds;
	}

	public String issueToken(UserPrincipal principal) {
		Instant now = Instant.now();
		return Jwts.builder()
			.subject(principal.email())
			.claim("uid", principal.id())
			.claim("roles", principal.roles().stream().map(Enum::name).toList())
			.issuedAt(Date.from(now))
			.expiration(Date.from(now.plusSeconds(expirationSeconds)))
			.signWith(secretKey)
			.compact();
	}

	public String extractSubject(String token) {
		return parseClaims(token).getSubject();
	}

	public boolean isValid(String token) {
		try {
			parseClaims(token);
			return true;
		} catch (Exception ignored) {
			return false;
		}
	}

	private Claims parseClaims(String token) {
		return Jwts.parser()
			.verifyWith(secretKey)
			.build()
			.parseSignedClaims(token)
			.getPayload();
	}
}

