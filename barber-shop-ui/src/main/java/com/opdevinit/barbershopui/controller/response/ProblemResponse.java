package com.opdevinit.barbershopui.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

public record ProblemResponse(@JsonProperty("status") int status,
        @JsonProperty("timestamp") String timestamp,
        @JsonProperty("message") String message) {

    @Builder(toBuilder = true)
    public ProblemResponse {
        // Constructor with builder
    }
}
