package com.opdevinit.barbershopui.service.query;

import java.util.List;

import com.opdevinit.barbershopui.entity.ClientEntity;

public interface IClientQueryService {

    ClientEntity findById(final long id);

    List<ClientEntity> findAll();

    void verifyPhone(final String phoneNumber);

    void verifyPhone(final long id,final String phoneNumber);

    void verifyEmail(final String email);

    void verifyEmail(final long id, final String email);

}
