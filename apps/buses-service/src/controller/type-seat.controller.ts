import { Controller, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { CreateTypeSeatDto, TypeSeatDto } from '../dto/type-seat.dto';
import { TypeSeatService } from '../service/type-seat.service';
import { GenericResponse } from '../response/generic.response';

@Controller()

export class TypeSeatController {
    constructor(
        private readonly _typeSeatService: TypeSeatService
    ){}

    @MessagePattern({role: 'typeSeat', cmd: 'get_typeSeat'})
    async getAll(): Promise<GenericResponse<TypeSeatDto[]>>{
        return await this._typeSeatService.getAll()
    }


    @MessagePattern({role: 'typeSeat', cmd: 'getById_typeSeat'})
    async getById(id: string): Promise<GenericResponse<TypeSeatDto[]>>{
        return await this._typeSeatService.getById(id)
    }

    @MessagePattern({role: 'typeSeat', cmd: 'create_typeSeat'})
    async create(@Body() typeSeat: CreateTypeSeatDto): Promise<GenericResponse<TypeSeatDto[]>>{
        try{
             return await this._typeSeatService.create(typeSeat)
        }catch(error) {
            throw new Error("Hubo un error al guardar");
        }
    }

    @MessagePattern({role: 'typeSeat', cmd: 'update_typeSeat'})
    async update(@Body() typeSeats: any): Promise<GenericResponse<TypeSeatDto[]>>{
        try{
            const { typeSeat, value } = typeSeats
            const { id } = value
            
             return await this._typeSeatService.update(typeSeat, id)
        }catch(error) {
            throw new Error("Hubo un error al editar");
        }
    }

    @MessagePattern({role: 'typeSeat', cmd: 'delete_typeSeat'})
    async delete(id: string): Promise<GenericResponse<TypeSeatDto[]>>{
        return await this._typeSeatService.delete(id)
    }
}
