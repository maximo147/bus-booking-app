import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';

import { v4 } from 'uuid'
import { ModelInterface } from './generic.interface';
import { GenericResponse } from '../response/generic.response';
import { BookingDetailDto, CreateBookingDetailDto, UpdateBookingDetailDto } from '../dto/booking-detail.dto';
import { BookingDetailRepository } from '../repository/booking-detail.repository';
import { BookingDetail } from '../entity/booking-detail.entity';
import { TypeSeatDetail } from 'apps/buses-service/src/entity/type-seat-detail.entity';
import { TypeSeatDetailRepository } from 'apps/buses-service/src/repository/type-seat-detail.repository';


@Injectable()
export class BookingDetailService implements ModelInterface<CreateBookingDetailDto, String>{
    constructor(
        @InjectRepository(BookingDetail) private readonly _bookingDetailRepository: BookingDetailRepository,
        @InjectRepository(TypeSeatDetail) private readonly _typeSeatDetailRepository: TypeSeatDetailRepository
    ) { }

    /**
     * 
     * @returns 
     */
    public async getAll(): Promise<GenericResponse<BookingDetailDto[]>> {
        try {
            let bookingDetails: BookingDetailDto[] = await this._bookingDetailRepository.find({
                relations: {
                    idBooking: true,
                    idTypeSeatDetail: { idTypeSeat: true},
                    idItinerary: true,
                    
                    user: true
                }
            })
            const response = new GenericResponse<BookingDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, bookingDetails);
            return response
        } catch {
            const response = new GenericResponse<BookingDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: '' }, []);
            return response
        }

    }

    /**
     * 
     * @param value 
     * @returns 
     */
    public async getById(value: any): Promise<GenericResponse<BookingDetailDto[]>> {
        try {
            const { id } = value
            const existe = await this._bookingDetailRepository.findOne({
                where: { id_booking_details: id }, relations: {
                    idBooking: true,
                    idTypeSeatDetail: true,
                    idItinerary: true
                }
            })
            if (!existe) {
                const response = new GenericResponse<BookingDetailDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: '' }, []);
                return response
            }
            const response = new GenericResponse<BookingDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, [existe]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al obtener rol");

            }
            const response = new GenericResponse<BookingDetailDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    /**
     * 
     * @param bookingDetail 
     * @returns 
     */
    public async create(bookingDetail: CreateBookingDetailDto): Promise<GenericResponse<any[]>> {
        try {
            const newBookingDetail = new CreateBookingDetailDto();
            newBookingDetail.id_booking_details = v4()
            newBookingDetail.idBooking = bookingDetail.idBooking
            newBookingDetail.idItinerary = bookingDetail.idItinerary
            newBookingDetail.idTypeSeatDetail = bookingDetail.idTypeSeatDetail
            newBookingDetail.status = bookingDetail.status
            newBookingDetail.state = bookingDetail.state
            newBookingDetail.user = bookingDetail.user

            const type = await this._typeSeatDetailRepository.findOne({ where: { id_type_seat_detail: bookingDetail.idTypeSeatDetail.id_type_seat_detail } })
            if (type) {
                let newType = Object.assign(type, { busy: 'PENDIENTE' })
                await this._typeSeatDetailRepository.save(newType)
            }

            const value: BookingDetailDto = await this._bookingDetailRepository.save(newBookingDetail)

            const response = new GenericResponse<BookingDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '201', message: '' }, [value]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al crear rol.");
            }
            const response = new GenericResponse<BookingDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: '' }, []);
            return response
        }
    }

    /**
     * 
     * @param bookingDetail 
     * @param value 
     * @returns 
     */
    public async update(bookingDetail: UpdateBookingDetailDto, value: string): Promise<GenericResponse<BookingDetailDto[]>> {
        const existe = await this._bookingDetailRepository.findOne({ where: { id_booking_details: value } })
        try {
            if (!existe) {
                const response = new GenericResponse<BookingDetailDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: 'No existe' }, []);
                return response
            }
            const newBookingDetail = Object.assign(existe, bookingDetail)
            const value = await this._bookingDetailRepository.save(newBookingDetail)
            const response = new GenericResponse<BookingDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, [newBookingDetail]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("hubo un error al actualizar rol");
            }
            const response = new GenericResponse<BookingDetailDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    /**
     * 
     * @param value 
     * @returns 
     */
    public async delete(value: any): Promise<GenericResponse<BookingDetailDto[]>> {
        try {
            const { id } = value
            const existe = await this._bookingDetailRepository.findOne({ where: { id_booking_details: id }, relations: { idTypeSeatDetail: true} })
            if (!existe) {
                const response = new GenericResponse<BookingDetailDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: 'No existe' }, []);
                return response
            }
        
            const type = await this._typeSeatDetailRepository.findOne({ where: { id_type_seat_detail: existe.idTypeSeatDetail.id_type_seat_detail } })
            if (type) {
                let newType = Object.assign(type, { busy: 'LIBRE' })
                await this._typeSeatDetailRepository.save(newType)
            }

            await this._bookingDetailRepository.delete({ id_booking_details: id })

            const response = new GenericResponse<BookingDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '203', message: '' }, []);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al eliminar el rol");
            }
            const response = new GenericResponse<BookingDetailDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }


    /**
     * 
     * @param bookingDetail 
     * @returns 
     */
    public async updateCart(bookingDetail: any): Promise<GenericResponse<BookingDetailDto[]>> {
        try {

            const pendientes: BookingDetailDto[] = await this._bookingDetailRepository.find({ where: { state: true, status: false } }) //, user: bookingDetail.user
            const libres = await this._typeSeatDetailRepository.find({ where: { idItinerary: bookingDetail.idItinerary.id_itinerary } })
            for (const item of pendientes) {
                await this._bookingDetailRepository.delete(item)
            }
            for (const item of libres) {
                item.busy = 'LIBRE'
                await this._typeSeatDetailRepository.save(item)
            }
            


            const response = new GenericResponse<BookingDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '201', message: '' }, pendientes);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al crear rol.");
            }
            const response = new GenericResponse<BookingDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: '' }, []);
            return response
        }
    }



    /**
     * 
     * @param id 
     * @returns 
     */
    public async getAllByUser(value: any): Promise<GenericResponse<BookingDetailDto[]>> {
        try {
            const { id } = value
            
            let bookings: BookingDetailDto[] = await this._bookingDetailRepository.find({
                relations: {
                    idTypeSeatDetail:  {
                        idTypeSeat: true
                    },
                    idBooking: true,
                    idItinerary: {
                        idBus: true
                    }
                },
                where: {
                    user: { id_user: id },
                    state: true,
                    status: true
                }
            })
            const response = new GenericResponse<BookingDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, bookings);
            return response
        } catch (error) {
            const response = new GenericResponse<BookingDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error.name }, []);
            return response
        }

    }

}
