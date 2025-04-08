package com.opdevinit.barbershopui.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.opdevinit.barbershopui.controller.request.SaveClientRequest;
import com.opdevinit.barbershopui.controller.request.UpdateClientRequest;
import com.opdevinit.barbershopui.controller.response.ClientDetailResponse;
import com.opdevinit.barbershopui.controller.response.ListClientResponse;
import com.opdevinit.barbershopui.controller.response.SaveClientResponse;
import com.opdevinit.barbershopui.controller.response.UpdateClientResponse;
import com.opdevinit.barbershopui.entity.ClientEntity;


@Mapper(componentModel = "spring")
public interface IClientMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "schedules", ignore = true)
    ClientEntity toEntity(final SaveClientRequest request);

    @Mapping(target = "schedules", ignore = true)
    ClientEntity toEntity(final long id, UpdateClientRequest request);

    SaveClientResponse toSaveResponse(ClientEntity entity);

    UpdateClientResponse toUpdateResponse(final ClientEntity request);

    ClientDetailResponse toDetailResponse(ClientEntity entity);

    List<ListClientResponse> toListResponse(List<ClientEntity> entities);
}
