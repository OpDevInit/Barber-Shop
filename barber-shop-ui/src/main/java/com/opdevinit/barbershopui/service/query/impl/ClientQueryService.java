package com.opdevinit.barbershopui.service.query.impl;

import java.util.List;
import java.util.Objects;
import org.springframework.stereotype.Service;

import com.opdevinit.barbershopui.entity.ClientEntity;
import com.opdevinit.barbershopui.repository.ClientRepository;
import com.opdevinit.barbershopui.service.query.IClientQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ClientQueryService implements IClientQueryService {

    private final ClientRepository repository;


    @Override
    public ClientEntity findById(long id) {
      return repository.findById(id).orElseThrow(() -> new RuntimeException("Client not found"));
    }

    @Override
    public List<ClientEntity> findAll() {
        return repository.findAll();
    }

    @Override
    public void verifyPhone(String phoneNumber) {
        if (repository.existsByPhone(phoneNumber)) {
            throw new RuntimeException("Phone number already exists");
            
        }
        
    }

    @Override
    public void verifyPhone(long id, final String phoneNumber) {
        var optional = repository.findByPhone(phoneNumber);

        if (optional.isPresent() && !Objects.equals(optional.get().getPhone(), phoneNumber)) {
            throw new RuntimeException("Phone number already exists");
        }
    }

    @Override
    public void verifyEmail(String email) {
        if (repository.existsByEmail(email)) {
            throw new RuntimeException("Phone number already exists");

        }
    }

    @Override
    public void verifyEmail(long id, String email) {
        var optional = repository.findByEmail(email);

        if (optional.isPresent() && !Objects.equals(optional.get().getEmail(), email)) {
            throw new RuntimeException("Email already exists");
        }
    }

}
