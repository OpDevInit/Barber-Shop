package com.opdevinit.barbershopui.service.impl;

import org.springframework.stereotype.Service;

import com.opdevinit.barbershopui.entity.ScheduleEntity;
import com.opdevinit.barbershopui.repository.ScheduleRepository;
import com.opdevinit.barbershopui.service.IScheduleService;
import com.opdevinit.barbershopui.service.query.IScheduleQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ScheduleService implements IScheduleService{

    private final ScheduleRepository scheduleService;
    private final IScheduleQueryService queryService;

    @Override
    public ScheduleEntity save(ScheduleEntity entity) {
        queryService.verifyIfSchedulesExists(entity.getStartAt(), entity.getEndAt());
        System.out.println(entity);
        return scheduleService.save(entity);
    }

    @Override
    public void delete(long id) {
        queryService.findById(id);
        scheduleService.deleteById(id);
    }


}
