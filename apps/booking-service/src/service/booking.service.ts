import { Injectable } from '@nestjs/common';
import { Booking } from '../entity/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingRepository } from '../repository/booking.repository';
import { BadRequestException } from '@nestjs/common/exceptions';

import { v4 } from 'uuid'
import { CreateBookingDto, BookingDto, UpdateBookingDto } from '../dto/booking.dto';
import { ModelInterface } from './generic.interface';
import { GenericResponse } from '../response/generic.response';
import { BookingDetailService } from './booking-detail.service';
import { TypeSeatDetail } from 'apps/buses-service/src/entity/type-seat-detail.entity';
import { TypeSeatDetailRepository } from 'apps/buses-service/src/repository/type-seat-detail.repository';
import { BookingDetail } from '../entity/booking-detail.entity';
import { BookingDetailRepository } from '../repository/booking-detail.repository';
import { UpdateBookingDetailDto } from '../dto/booking-detail.dto';


@Injectable()
export class BookingService implements ModelInterface<CreateBookingDto, String>{
    constructor(
        @InjectRepository(Booking) private readonly _bookingRepository: BookingRepository,
        @InjectRepository(BookingDetail) private readonly _bookingDetailRepository: BookingDetailRepository,
        private _bookingDetailService: BookingDetailService
    ) { }

    public async getAll(): Promise<GenericResponse<BookingDto[]>> {
        try {
            let bookings: BookingDto[] = await this._bookingRepository.find({
                relations: {
                    user: true,
                }
            })
            const response = new GenericResponse<BookingDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, bookings);
            return response
        } catch (error) {
            const response = new GenericResponse<BookingDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error.name }, []);
            return response
        }

    }

    public async getById(value: any): Promise<GenericResponse<BookingDto[]>> {
        try {
            const { id } = value
            const existe = await this._bookingRepository.findOne({
                where: { id_booking: id }, relations: {
                    user: true,
                    bookingDetail: true
                }
            })
            if (!existe) {
                const response = new GenericResponse<BookingDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: '' }, []);
                return response
            }
            const response = new GenericResponse<BookingDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, [existe]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al obtener rol");

            }
            const response = new GenericResponse<BookingDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    public async create(booking: CreateBookingDto): Promise<GenericResponse<BookingDto[]>> {
        const { bookingDetail, ...buss } = booking;
  

        try {
            const newBooking = new CreateBookingDto();
            newBooking.id_booking = v4();
            newBooking.dateBooking = booking.dateBooking;
            newBooking.costTotal = booking.costTotal;
            newBooking.user = booking.user;
            newBooking.costTotal = booking.costTotal;

            const value = await this._bookingRepository.save(newBooking);
            if (value) {
                const ventasDetalle= await this._bookingDetailRepository.find({where: { user: booking.user }})
                let newData = new UpdateBookingDetailDto()
                newData.idBooking = value
                newData.status= true
                ventasDetalle.map(async x => {
                    const newBookingDetail = Object.assign(x, newData)
                    await this._bookingDetailRepository.save(newBookingDetail)
                })
                
            }

            const response = new GenericResponse<BookingDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '201', message: '' }, [value]);
            return response;

        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al crear Reserva.");
            }
            const response = new GenericResponse<BookingDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error.name }, []);
            return response;
        }
    }

    public async update(booking: UpdateBookingDto, value: string): Promise<GenericResponse<BookingDto[]>> {
        const existe = await this._bookingRepository.findOne({ where: { id_booking: value } })
        try {
            if (!existe) {
                const response = new GenericResponse<BookingDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: 'No existe' }, []);
                return response
            }
            const newBooking = Object.assign(existe, booking)
            const value = await this._bookingRepository.save(newBooking)
            const response = new GenericResponse<BookingDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, [newBooking]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("hubo un error al actualizar rol");
            }
            const response = new GenericResponse<BookingDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    public async delete(value: any): Promise<GenericResponse<BookingDto[]>> {
        try {
            const { id } = value
            const existe = await this._bookingRepository.findOne({ where: { id_booking: id } })
            if (!existe) {
                const response = new GenericResponse<BookingDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: 'No existe' }, []);
                return response
            }

            await this._bookingRepository.delete({ id_booking: id })

            const response = new GenericResponse<BookingDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '203', message: '' }, []);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al eliminar el rol");
            }
            const response = new GenericResponse<BookingDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }


}
