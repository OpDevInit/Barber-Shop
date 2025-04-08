package com.opdevinit.barbershopui.service.query.impl;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.opdevinit.barbershopui.entity.ScheduleEntity;
import com.opdevinit.barbershopui.repository.ScheduleRepository;
import com.opdevinit.barbershopui.service.query.IScheduleQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ScheduleQueryService implements IScheduleQueryService {

    private final ScheduleRepository repository;

    @Override
    public ScheduleEntity findById(long id) {
       return repository.findById(id).orElseThrow(() -> new RuntimeException("Schedule not found"));
    }

    @Override
    public List<ScheduleEntity> findInMonth(OffsetDateTime startAt, OffsetDateTime endAt) {
        return repository.findByStartAtGreaterThanEqualAndEndAtLessThanEqualOrderByStartAtAscEndAtAsc(startAt, endAt);
    }

    @Override
    public void verifyIfSchedulesExists(OffsetDateTime startAt, OffsetDateTime endAt) {
        if (repository.existsByStartAtAndEndAt(startAt, endAt)) {
            throw new RuntimeException("Schedule already exists");
        }
    }

}
