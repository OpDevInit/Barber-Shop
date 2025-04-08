package com.opdevinit.barbershopui.service.query;

import java.time.OffsetDateTime;
import java.util.List;

import com.opdevinit.barbershopui.entity.ScheduleEntity;

public interface IScheduleQueryService {

    ScheduleEntity findById(final long id);

    List<ScheduleEntity> findInMonth(final OffsetDateTime startAt , final OffsetDateTime endAt);

    void verifyIfSchedulesExists(final OffsetDateTime startAt, final OffsetDateTime endAt);


}
