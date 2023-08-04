import { Controller, Body, Post, Get, Param, Patch } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';


import { CreateBookingDto, BookingDto, UpdateBookingDto } from '../dto/booking.dto';
import { BookingService } from '../service/booking.service';
import { GenericResponse } from '../response/generic.response';

@Controller()

export class BookingController {
    constructor(
        private readonly _bookingService: BookingService
    ){}

    @MessagePattern({role: 'booking', cmd: 'get_booking'})
    async getAll(): Promise<GenericResponse<BookingDto[]>>{
        return await this._bookingService.getAll()
    }


    @MessagePattern({role: 'booking', cmd: 'getById_booking'})
    async getById(id: string): Promise<GenericResponse<BookingDto[]>>{
        return await this._bookingService.getById(id)
    }

    @MessagePattern({role: 'booking', cmd: 'create_booking'})
    async create(@Body() booking: CreateBookingDto): Promise<GenericResponse<BookingDto[]>>{
        try{
             return await this._bookingService.create(booking)
        }catch(error) {
            throw new Error("Hubo un error al guardar");
        }
    }

    @MessagePattern({role: 'booking', cmd: 'update_booking'})
    async update(@Body() bookings: any): Promise<GenericResponse<BookingDto[]>>{
        try{
            const { booking, value } = bookings
            const { id } = value
            
             return await this._bookingService.update(booking, id)
        }catch(error) {
            throw new Error("Hubo un error al editar");
        }
    }

    @MessagePattern({role: 'booking', cmd: 'delete_booking'})
    async delete(id: string): Promise<GenericResponse<BookingDto[]>>{
        return await this._bookingService.delete(id)
    }
}
