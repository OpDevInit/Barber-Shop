package com.opdevinit.barbershopui.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.opdevinit.barbershopui.controller.request.SaveScheduleRequest;
import com.opdevinit.barbershopui.controller.response.ClientScheduleAppointmentResponse;
import com.opdevinit.barbershopui.controller.response.SaveScheduleResponse;
import com.opdevinit.barbershopui.controller.response.ScheduleAppointmentMonthResponse;
import com.opdevinit.barbershopui.entity.ScheduleEntity;

@Mapper(componentModel = "spring")
public interface IscheduleMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "client.id", source = "clientId")
    ScheduleEntity toEntity(SaveScheduleRequest request);

    @Mapping(target = "clientId", source = "client.id")
    SaveScheduleResponse toSaveResponse(ScheduleEntity entity);

    @Mapping(target = "scheduleAppointments", expression = "java(toClientMonthResponse(entities))")
    ScheduleAppointmentMonthResponse toMonthResponse(int year, int month, List<ScheduleEntity> entities);

    List<ClientScheduleAppointmentResponse> toClientMonthResponse(final List<ScheduleEntity> entities);

    @Mapping(target = "clientId", source = "client.id")
    @Mapping(target = "clientName", source = "client.name")
    @Mapping(target = "day", expression = "java(entity.getStartAt.getDayOfMonth())")
    ClientScheduleAppointmentResponse toClientMonthResponse(final ScheduleEntity entity);

}
