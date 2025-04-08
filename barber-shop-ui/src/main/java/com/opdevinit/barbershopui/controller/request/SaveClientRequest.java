package com.opdevinit.barbershopui.controller.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record SaveClientRequest(
    @NotNull @JsonProperty("name")String name,
    @NotNull @JsonProperty("email")@Email String email,
    @NotNull @JsonProperty("phone")String phone
    )
{

}
