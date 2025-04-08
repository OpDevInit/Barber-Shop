package com.opdevinit.barbershopui.controller.response;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ClientScheduleAppointmentResponse(

        @JsonProperty("id") Long id,
        @JsonProperty("day") Integer day,
        @JsonProperty("startAt") OffsetDateTime startAt,
        @JsonProperty("endAt") OffsetDateTime endAt,
        @JsonProperty("clientId") Long clientId,
        @JsonProperty("clientName") String clientName

) {
}
