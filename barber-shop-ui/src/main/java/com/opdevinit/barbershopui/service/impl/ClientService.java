package com.opdevinit.barbershopui.service.impl;

import org.springframework.stereotype.Service;

import com.opdevinit.barbershopui.entity.ClientEntity;
import com.opdevinit.barbershopui.repository.ClientRepository;
import com.opdevinit.barbershopui.service.IClientService;
import com.opdevinit.barbershopui.service.query.IClientQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ClientService implements IClientService {

    private final ClientRepository clientService;
    private final IClientQueryService queryService;
    
    @Override
    public ClientEntity save(ClientEntity entity) { 
        queryService.verifyEmail(entity.getEmail());
        queryService.verifyPhone(entity.getPhone());

        return clientService.save(entity);
    }
    @Override
    public ClientEntity update(ClientEntity entity) {
        queryService.verifyEmail(entity.getId(),entity.getEmail());
        queryService.verifyPhone(entity.getId(),entity.getPhone());

        var stored = queryService.findById(entity.getId());
        stored.setName(entity.getName());
        stored.setEmail(entity.getEmail());

        return clientService.save(stored);

    }
    @Override
    public void delete(long id) {
        queryService.findById(id);
        clientService.deleteById(id);
    }



}
