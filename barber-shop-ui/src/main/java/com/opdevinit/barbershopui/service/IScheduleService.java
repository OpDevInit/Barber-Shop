package com.opdevinit.barbershopui.service;

import com.opdevinit.barbershopui.entity.ScheduleEntity;

public interface IScheduleService {

    ScheduleEntity save(final ScheduleEntity entity);

    void delete(final long id);


}
