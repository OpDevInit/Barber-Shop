package com.opdevinit.barbershopui.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ListClientResponse(@JsonProperty("id") Long id,
                                 @JsonProperty("name") String name,
                                 @JsonProperty("email") String email,
                                 @JsonProperty("phone") String phone) {

}
