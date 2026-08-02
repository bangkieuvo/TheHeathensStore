package com.example.TheHeathensStore.exception;

import com.example.TheHeathensStore.dto.wrapper.ApiResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.validation.FieldError;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGlobalException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(ApiResponse.of(
                                     HttpStatus.INTERNAL_SERVER_ERROR.value(),
                                     "An unexpected error occurred",
                                     false,
                                     null
                             ));
    }

//    @ExceptionHandler(MaxUploadSizeExceededException.class)
//    public ResponseEntity<Map<String, Object>> handleMaxSizeException(MaxUploadSizeExceededException ex) {
//        Map<String, Object> errorResponse = new HashMap<>();
//        errorResponse.put("timestamp", LocalDateTime.now());
//        errorResponse.put("status", HttpStatus.PAYLOAD_TOO_LARGE.value());
//        errorResponse.put("error", "Payload Too Large");
//        errorResponse.put("message", "File ảnh quá lớn! Vui lòng chọn ảnh có dung lượng nhỏ hơn.");
//
//        return new ResponseEntity<>(errorResponse, HttpStatus.PAYLOAD_TOO_LARGE);
//    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body(ApiResponse.of(HttpStatus.NOT_FOUND.value(), ex.getMessage(), false, null));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleEntityNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body(ApiResponse.of(HttpStatus.NOT_FOUND.value(), ex.getMessage(), false, null));
    }

    @ExceptionHandler(InvalidRequestException.class)
    public ResponseEntity<ApiResponse<Void>> handleInvalidRequestException(Exception ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(ApiResponse.of(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), false, null));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<Void>> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(ApiResponse.of(
                                     HttpStatus.BAD_REQUEST.value(),
                                     "Invalid JSON or JSON parse error",
                                     false,
                                     null
                             ));
    }

    @ExceptionHandler(InsufficientStockException.class)
    public ResponseEntity<ApiResponse<Void>> handleInsufficientStock(InsufficientStockException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                             .body(ApiResponse.of(HttpStatus.CONFLICT.value(), ex.getMessage(), false, null));
    }

    @ExceptionHandler({
            MethodArgumentTypeMismatchException.class,
            MissingServletRequestParameterException.class,
            MissingServletRequestPartException.class
    })
    public ResponseEntity<ApiResponse<Void>> handleMalformedRequest(Exception ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(ApiResponse.of(
                                     HttpStatus.BAD_REQUEST.value(),
                                     "Request parameters are invalid or incomplete",
                                     false,
                                     null
                             ));
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiResponse<Void>> handleMaxUploadSize(MaxUploadSizeExceededException ex) {
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                             .body(ApiResponse.of(
                                     HttpStatus.PAYLOAD_TOO_LARGE.value(),
                                     "Uploaded files exceed the allowed size",
                                     false,
                                     null
                             ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult()
                           .getFieldErrors()
                           .stream()
                           .map(FieldError::getDefaultMessage) // lấy msg từ @NotBlank
                           .collect(Collectors.joining("; "));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(ApiResponse.of(HttpStatus.BAD_REQUEST.value(), message, false, null));
    }
}
