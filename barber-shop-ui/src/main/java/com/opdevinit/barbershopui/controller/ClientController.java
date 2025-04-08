package com.opdevinit.barbershopui.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.opdevinit.barbershopui.controller.request.SaveClientRequest;
import com.opdevinit.barbershopui.controller.request.UpdateClientRequest;
import com.opdevinit.barbershopui.controller.response.ClientDetailResponse;
import com.opdevinit.barbershopui.controller.response.ListClientResponse;
import com.opdevinit.barbershopui.controller.response.SaveClientResponse;
import com.opdevinit.barbershopui.controller.response.UpdateClientResponse;
import com.opdevinit.barbershopui.mapper.IClientMapper;
import com.opdevinit.barbershopui.service.IClientService;
import com.opdevinit.barbershopui.service.query.IClientQueryService;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("clients")
@AllArgsConstructor
public class ClientController {

    private final IClientService service;
    private final IClientQueryService queryService;
    private final IClientMapper mapper;


    @GetMapping("{id}")
    public ClientDetailResponse findById(@PathVariable final long id) {
        var entity = queryService.findById(id);
        return mapper.toDetailResponse(entity);
    }
    


    @PostMapping
    @ResponseStatus(CREATED)
    SaveClientResponse save(@RequestBody @Valid SaveClientRequest request){
        var entity = mapper.toEntity(request);
        service.save(entity);
        return mapper.toSaveResponse(entity);
    }

    @GetMapping
    List<ListClientResponse> list(){
        var entities = queryService.findAll();
        return mapper.toListResponse(entities);
    }

    @PutMapping("{id}")
    UpdateClientResponse UpdateClientResponse(@PathVariable Long id, @RequestBody @Valid UpdateClientRequest request){
        var entity =  mapper.toEntity(id,request);
        service.update(entity);
        return mapper.toUpdateResponse(entity);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    void delete(@PathVariable Long id){
        service.delete(id);
    }


   
}

