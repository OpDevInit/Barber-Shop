package com.opdevinit.barbershopui.controller.request;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;

public record SaveScheduleRequest(
        @NotNull @JsonProperty("startAt") OffsetDateTime startAt,
        @NotNull @JsonProperty("endAt") OffsetDateTime endAt,
        @NotNull @JsonProperty("clientId") Long clientId

) {

}
