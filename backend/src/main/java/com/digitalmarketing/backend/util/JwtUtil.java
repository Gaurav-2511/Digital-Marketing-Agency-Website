package com.digitalmarketing.backend.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final SecretKey signingKey;
	private final long expiration;

	public JwtUtil(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration}") long expiration) {

		this.signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

		this.expiration = expiration;
	}

	public String generateToken(String email, String role) {

		Date issuedAt = new Date();

		Date expirationDate = new Date(issuedAt.getTime() + expiration);

		return Jwts.builder().subject(email).claim("role", role).issuedAt(issuedAt).expiration(expirationDate)
				.signWith(signingKey).compact();
	}

	public String extractEmail(String token) {

		return extractAllClaims(token).getSubject();
	}

	public String extractRole(String token) {

		return extractAllClaims(token).get("role", String.class);
	}

	public boolean isTokenValid(String token) {

		try {

			Claims claims = extractAllClaims(token);

			return !claims.getExpiration().before(new Date());

		} catch (Exception exception) {

			return false;
		}
	}

	private Claims extractAllClaims(String token) {

		return Jwts.parser().verifyWith(signingKey).build().parseSignedClaims(token).getPayload();
	}
}