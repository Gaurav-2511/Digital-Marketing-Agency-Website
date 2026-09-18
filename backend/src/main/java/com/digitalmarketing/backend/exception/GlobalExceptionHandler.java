package com.digitalmarketing.backend.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiErrorResponse> handleResourceNotFoundException(ResourceNotFoundException exception) {

		ApiErrorResponse response = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(),
				exception.getMessage(), null);

		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiErrorResponse> handleValidationException(MethodArgumentNotValidException exception) {

		Map<String, String> errors = new HashMap<>();

		exception.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

		ApiErrorResponse response = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.BAD_REQUEST.value(),
				"Validation failed", errors);

		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiErrorResponse> handleGenericException(Exception exception) {

		ApiErrorResponse response = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(),
				"An unexpected error occurred", null);

		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ApiErrorResponse> handleIllegalArgumentException(IllegalArgumentException exception) {

		ApiErrorResponse response = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.BAD_REQUEST.value(),
				exception.getMessage(), null);

		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

}
