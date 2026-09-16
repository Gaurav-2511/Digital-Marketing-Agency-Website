package com.digitalmarketing.backend.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.digitalmarketing.backend.dto.request.LoginRequest;
import com.digitalmarketing.backend.dto.request.RegisterRequest;
import com.digitalmarketing.backend.dto.response.LoginResponse;
import com.digitalmarketing.backend.dto.response.UserResponse;
import com.digitalmarketing.backend.entity.Role;
import com.digitalmarketing.backend.entity.User;
import com.digitalmarketing.backend.repository.UserRepository;
import com.digitalmarketing.backend.service.AuthService;
import com.digitalmarketing.backend.util.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;

	public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
			AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtUtil = jwtUtil;
	}

	@Override
	public UserResponse register(RegisterRequest request) {

		if (userRepository.findByEmail(request.getEmail()).isPresent()) {
			throw new IllegalArgumentException("User already exists with email: " + request.getEmail());
		}

		User user = new User();

		user.setName(request.getName());
		user.setEmail(request.getEmail());

		user.setPassword(passwordEncoder.encode(request.getPassword()));

		user.setRole(Role.USER);
		user.setEnabled(true);

		User savedUser = userRepository.save(user);

		return new UserResponse(savedUser.getId(), savedUser.getName(), savedUser.getEmail(), savedUser.getRole());
	}

	@Override
	public LoginResponse login(LoginRequest request) {

		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new IllegalArgumentException("User not found with email: " + request.getEmail()));

		String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

		UserResponse userResponse = new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());

		return new LoginResponse(token, userResponse);
	}

}
