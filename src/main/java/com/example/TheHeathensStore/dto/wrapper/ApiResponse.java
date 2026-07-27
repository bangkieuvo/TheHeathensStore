package com.example.TheHeathensStore.dto.wrapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private int statusCode;
    private String message;
    private boolean success;
    private T data;

    public static <T> ApiResponse<T> of(int statusCode, String message, boolean success, T data) {
        return ApiResponse.<T>builder()
                          .statusCode(statusCode)
                          .message(message)
                          .success(success)
                          .data(data)
                          .build();
    }

    public static <T> ApiResponse<T> success(T data) {
        return of(200, "success", true, data);
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return of(200, message, true, data);
    }
}
