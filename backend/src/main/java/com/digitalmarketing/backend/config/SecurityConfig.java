package com.digitalmarketing.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.digitalmarketing.backend.security.CustomUserDetailsService;
import com.digitalmarketing.backend.security.JwtAuthenticationFilter;
import com.digitalmarketing.backend.util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {

	private final JwtUtil jwtUtil;
	private final CustomUserDetailsService userDetailsService;

	public SecurityConfig(JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
		super();
		this.jwtUtil = jwtUtil;
		this.userDetailsService = userDetailsService;
	}

	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter(jwtUtil, userDetailsService);
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http
	    .csrf(csrf -> csrf.disable())
	    .sessionManagement(session ->
	        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	    .authorizeHttpRequests(auth -> auth
	        .requestMatchers(
	                "/api/health",
	                "/api/auth/**",
	                "/api/services/**",
	                "/api/portfolio/**",
	                "/api/case-studies/**",
	               "/api/blog-categories/**",
	               "/api/blogs/**",
	               "/api/testimonials/**",
	               "/api/leads/**",
	                "/error"
	        ).permitAll()
	        .requestMatchers("/api/admin/**").hasRole("ADMIN")
	        .anyRequest().authenticated())
	    .exceptionHandling(exception -> exception
	        .authenticationEntryPoint((request, response, authException) -> {

	            response.sendError(
	                HttpServletResponse.SC_UNAUTHORIZED,
	                "Unauthorized"
	            );
	        })
	        .accessDeniedHandler((request, response, accessDeniedException) -> {


	            response.sendError(
	                HttpServletResponse.SC_FORBIDDEN,
	                "Forbidden"
	            );
	        }))

				.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

		return configuration.getAuthenticationManager();
	}
}
