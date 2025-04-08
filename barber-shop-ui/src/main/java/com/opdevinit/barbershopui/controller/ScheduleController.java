package com.opdevinit.barbershopui.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import static org.springframework.http.HttpStatus.*;

import java.time.YearMonth;
import static java.time.ZoneOffset.UTC;

import org.springframework.web.bind.annotation.RestController;

import com.opdevinit.barbershopui.controller.request.SaveScheduleRequest;
import com.opdevinit.barbershopui.controller.response.SaveScheduleResponse;
import com.opdevinit.barbershopui.controller.response.ScheduleAppointmentMonthResponse;
import com.opdevinit.barbershopui.mapper.IscheduleMapper;
import com.opdevinit.barbershopui.service.IScheduleService;
import com.opdevinit.barbershopui.service.query.IScheduleQueryService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("schedules")
@AllArgsConstructor
public class ScheduleController {

    private final IScheduleService service;
    private final IScheduleQueryService queryService;
    private final IscheduleMapper mapper;

    @GetMapping("{month}/{year}")
    ScheduleAppointmentMonthResponse listMonth(@PathVariable int month, @PathVariable int year){
        var yearMonth = YearMonth.of(year, month);
        var starAt = yearMonth.atDay(1).atTime(0, 0, 0, 0).atOffset(UTC);
        var endAt = yearMonth.atEndOfMonth().atTime(23, 59, 59, 999_999_999).atOffset(UTC);

        var entities = queryService.findInMonth(starAt, endAt);

        System.out.println(entities);
        return mapper.toMonthResponse(year, month, entities);

       

    }


    @ResponseStatus(CREATED)
    @PostMapping
    SaveScheduleResponse save(@RequestBody @Valid SaveScheduleRequest request) {
        var entity = mapper.toEntity(request);
        service.save(entity);
        return mapper.toSaveResponse(entity);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    void delete(@PathVariable Long id) {
        service.delete(id);
    }

}
