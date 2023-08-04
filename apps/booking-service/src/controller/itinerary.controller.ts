import { Controller, Body, Post, Get, Param, Patch } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';


import { CreateItineraryDto, ItineraryDto, UpdateItineraryDto } from '../dto/itinerary.dto';
import { GenericResponse } from '../response/generic.response';
import { ItineraryService } from '../service/itinerary.service';

@Controller()

export class ItineraryController {
    constructor(
        private readonly _itineraryService: ItineraryService
    ){}

    @MessagePattern({role: 'itinerary', cmd: 'get_itinerary'})
    async getAll(): Promise<GenericResponse<ItineraryDto[]>>{
        return await this._itineraryService.getAll()
    }


    @MessagePattern({role: 'itinerary', cmd: 'getById_itinerary'})
    async getById(id: string): Promise<GenericResponse<ItineraryDto[]>>{
        return await this._itineraryService.getById(id)
    }

    @MessagePattern({role: 'itinerary', cmd: 'create_itinerary'})
    async create(@Body() itinerary: CreateItineraryDto): Promise<GenericResponse<ItineraryDto[]>>{
        try{
             return await this._itineraryService.create(itinerary)
        }catch(error) {
            throw new Error("Hubo un error al guardar");
        }
    }

    @MessagePattern({role: 'itinerary', cmd: 'update_itinerary'})
    async update(@Body() itinerarys: any): Promise<GenericResponse<ItineraryDto[]>>{
        try{
            const { itinerary, value } = itinerarys
            const { id } = value
            
             return await this._itineraryService.update(itinerary, id)
        }catch(error) {
            throw new Error("Hubo un error al editar");
        }
    }

    @MessagePattern({role: 'itinerary', cmd: 'delete_itinerary'})
    async delete(id: string): Promise<GenericResponse<ItineraryDto[]>>{
        return await this._itineraryService.delete(id)
    }
}
