package com.opdevinit.barbershopui.repository;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opdevinit.barbershopui.entity.ScheduleEntity;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity,Long>{

    List<ScheduleEntity> findByStartAtGreaterThanEqualAndEndAtLessThanEqualOrderByStartAtAscEndAtAsc(OffsetDateTime startAt, OffsetDateTime endAt);

    boolean existsByStartAtAndEndAt(OffsetDateTime startAt,OffsetDateTime endAt);

}
