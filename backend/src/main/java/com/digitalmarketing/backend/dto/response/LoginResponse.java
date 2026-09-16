package com.digitalmarketing.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {

	private String token;
	
	private UserResponse user;
}
