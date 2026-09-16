package com.digitalmarketing.backend.service;

import com.digitalmarketing.backend.dto.request.LoginRequest;
import com.digitalmarketing.backend.dto.request.RegisterRequest;
import com.digitalmarketing.backend.dto.response.LoginResponse;
import com.digitalmarketing.backend.dto.response.UserResponse;

public interface AuthService {

	UserResponse register(RegisterRequest request);
	
	LoginResponse login(LoginRequest request);
}
