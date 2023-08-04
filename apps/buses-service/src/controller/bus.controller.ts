import { Controller, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';


import { GenericResponse } from '../response/generic.response';
import { BusDto, CreateBusDto } from '../dto/bus.dto';
import { BusService } from '../service/bus.service';

@Controller()

export class BusController {
    constructor(
        private readonly _busService: BusService
    ){}

    @MessagePattern({role: 'bus', cmd: 'get_bus'})
    async getAll(): Promise<GenericResponse<BusDto[]>>{
        return await this._busService.getAll()
    }


    @MessagePattern({role: 'bus', cmd: 'getById_bus'})
    async getById(id: string): Promise<GenericResponse<BusDto[]>>{
        return await this._busService.getById(id)
    }

    @MessagePattern({role: 'bus', cmd: 'create_bus'})
    async create(@Body() bus: CreateBusDto): Promise<GenericResponse<BusDto[]>>{
        try{
             return await this._busService.create(bus)
        }catch(error) {
            throw new Error("Hubo un error al guardar");
        }
    }

    @MessagePattern({role: 'bus', cmd: 'update_bus'})
    async update(@Body() buss: any): Promise<GenericResponse<BusDto[]>>{
        try{
            
            const { bus, value } = buss
            const { id } = value
             return await this._busService.update(bus, id)
        }catch(error) {
            throw new Error("Hubo un error al editar");
        }
    }

    @MessagePattern({role: 'bus', cmd: 'delete_bus'})
    async delete(id: string): Promise<GenericResponse<BusDto[]>>{
        return await this._busService.delete(id)
    }
}
