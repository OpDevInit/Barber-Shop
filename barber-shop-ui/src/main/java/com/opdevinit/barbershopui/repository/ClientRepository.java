package com.opdevinit.barbershopui.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opdevinit.barbershopui.entity.ClientEntity;

@Repository
public interface ClientRepository extends JpaRepository<ClientEntity, Long> {
    boolean existsByEmail(String email);
    Optional<ClientEntity> findByEmail(String email);

    boolean existsByPhone(String phone);
    Optional<ClientEntity> findByPhone(String phone);
}
