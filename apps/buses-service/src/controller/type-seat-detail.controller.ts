import { Controller, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';


import { CreateTypeSeatDetailDto, TypeSeatDetailDto, UpdateTypeSeatDetailDto } from '../dto/type-seat-detail.dto';
import { TypeSeatDetailService } from '../service/type-seat-detail.service';
import { GenericResponse } from '../response/generic.response';

@Controller()

export class TypeSeatDetailController {
    constructor(
        private readonly _typeSeatDetailService: TypeSeatDetailService
    ){}

    @MessagePattern({role: 'typeSeatDetail', cmd: 'get_typeSeatDetail'})
    async getAll(): Promise<GenericResponse<TypeSeatDetailDto[]>>{
        return await this._typeSeatDetailService.getAll()
    }


    @MessagePattern({role: 'typeSeatDetail', cmd: 'getById_typeSeatDetail'})
    async getById(id: string): Promise<GenericResponse<TypeSeatDetailDto[]>>{
        return await this._typeSeatDetailService.getById(id)
    }

    @MessagePattern({role: 'typeSeatDetail', cmd: 'create_typeSeatDetail'})
    async create(@Body() typeSeatDetail: CreateTypeSeatDetailDto): Promise<GenericResponse<TypeSeatDetailDto[]>>{
        try{
             return await this._typeSeatDetailService.create(typeSeatDetail)
        }catch(error) {
            throw new Error("Hubo un error al guardar");
        }
    }

    @MessagePattern({role: 'typeSeatDetail', cmd: 'update_typeSeatDetail'})
    async update(@Body() typeSeatDetails: any): Promise<GenericResponse<TypeSeatDetailDto[]>>{
        try{
            const { typeSeatDetail, value } = typeSeatDetails
            const { id } = value
            
             return await this._typeSeatDetailService.update(typeSeatDetail, id)
        }catch(error) {
            throw new Error("Hubo un error al editar");
        }
    }

    @MessagePattern({role: 'typeSeatDetail', cmd: 'delete_typeSeatDetail'})
    async delete(id: string): Promise<GenericResponse<TypeSeatDetailDto[]>>{
        return await this._typeSeatDetailService.delete(id)
    }

    @MessagePattern({role: 'typeSeatDetail', cmd: 'deleteByIdBus_typeSeatDetail'})
    async deleteByIdBus(id: string): Promise<GenericResponse<TypeSeatDetailDto[]>>{
        return await this._typeSeatDetailService.deleteByIdBus(id)
    }


    @MessagePattern({role: 'typeSeatDetail', cmd: 'getByPlate_typeSeatDetail'})
    async getByPlate(id: string): Promise<GenericResponse<TypeSeatDetailDto[]>>{
        return await this._typeSeatDetailService.getByPlate(id)
    }
}
