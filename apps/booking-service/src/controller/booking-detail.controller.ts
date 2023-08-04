import { Controller, Body, Post, Get, Param, Patch } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';


import { BookingDetailService } from '../service/booking-detail.service';
import { GenericResponse } from '../response/generic.response';
import { BookingDetailDto, CreateBookingDetailDto } from '../dto/booking-detail.dto';
import { UpdateCartService } from '../cron-jobs/update-cart.service';

@Controller()

export class BookingDetailController {
    constructor(
        private readonly _bookingDetailService: BookingDetailService,
        private readonly _updateCartService: UpdateCartService
    ){}

    @MessagePattern({role: 'bookingDetail', cmd: 'get_bookingDetail'})
    async getAll(): Promise<GenericResponse<BookingDetailDto[]>>{
        return await this._bookingDetailService.getAll()
    }


    @MessagePattern({role: 'bookingDetail', cmd: 'getById_bookingDetail'})
    async getById(id: string): Promise<GenericResponse<BookingDetailDto[]>>{
        return await this._bookingDetailService.getById(id)
    }

    @MessagePattern({role: 'bookingDetail', cmd: 'create_bookingDetail'})
    async create(@Body() bookingDetail: CreateBookingDetailDto): Promise<GenericResponse<BookingDetailDto[]>>{
        try{
            const save= await this._bookingDetailService.create(bookingDetail)

            this._updateCartService.startCron(bookingDetail)

            return save
        }catch(error) {
            throw new Error("Hubo un error al guardar"+error.message);
        }
    }

    @MessagePattern({role: 'bookingDetail', cmd: 'update_bookingDetail'})
    async update(@Body() bookingDetails: any): Promise<GenericResponse<BookingDetailDto[]>>{
        try{
            const { bookingDetail, value } = bookingDetails
            const { id } = value
            
             return await this._bookingDetailService.update(bookingDetail, id)
        }catch(error) {
            throw new Error("Hubo un error al editar");
        }
    }

    @MessagePattern({role: 'bookingDetail', cmd: 'delete_bookingDetail'})
    async delete(id: string): Promise<GenericResponse<BookingDetailDto[]>>{
        return await this._bookingDetailService.delete(id)
    }

    @MessagePattern({role: 'bookingDetail', cmd: 'getbyUser_bookingDetail'})
    async getAllByUser(id: string): Promise<GenericResponse<BookingDetailDto[]>> {
        return await this._bookingDetailService.getAllByUser(id)
    }
}
