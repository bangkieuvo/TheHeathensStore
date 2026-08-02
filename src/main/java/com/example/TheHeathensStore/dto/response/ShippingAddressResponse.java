package com.example.TheHeathensStore.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingAddressResponse {
    private Long id;
    private String recipientName;
    private String recipientPhone;
    private String address;
    @JsonProperty("isDefault")
    private boolean isDefault;
}
