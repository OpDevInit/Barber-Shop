package com.opdevinit.barbershopui.service;

import com.opdevinit.barbershopui.entity.ClientEntity;

public interface IClientService  {
    ClientEntity save(final ClientEntity entity);

    ClientEntity update(final ClientEntity entity);

    void delete(final long id);



}
