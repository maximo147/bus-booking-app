import { Injectable } from '@nestjs/common';
import { Itinerary } from '../entity/itinerary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ItineraryRepository } from '../repository/itinerary.repository';
import { BadRequestException } from '@nestjs/common/exceptions';

import { CreateItineraryDto, ItineraryDto, UpdateItineraryDto } from '../dto/itinerary.dto';
import { v4 } from 'uuid'
import { ModelInterface } from './generic.interface';
import { GenericResponse } from '../response/generic.response';
import { CreateTypeSeatDetailDto, UpdateTypeSeatDetailDto } from 'apps/buses-service/src/dto/type-seat-detail.dto';
import { TypeSeatDetailService } from 'apps/buses-service/src/service/type-seat-detail.service';
import { TypeSeatDetail } from 'apps/buses-service/src/entity/type-seat-detail.entity';
import { TypeSeatDetailRepository } from 'apps/buses-service/src/repository/type-seat-detail.repository';


@Injectable()
export class ItineraryService implements ModelInterface<CreateItineraryDto, String>{
    constructor(
        @InjectRepository(Itinerary) private readonly _itineraryRepository: ItineraryRepository,
        //@InjectRepository(TypeSeatDetail) private readonly _typeSeatDetailRepository: TypeSeatDetailRepository,
        private _typeSeatDetailService: TypeSeatDetailService
    ) { }

    public async getAll(): Promise<GenericResponse<ItineraryDto[]>> {
        try {
            let itinerarys: ItineraryDto[] = await this._itineraryRepository.find({ relations: { idBus: true } })
            const response = new GenericResponse<ItineraryDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, itinerarys);
            return response
        } catch (error) {
            const response = new GenericResponse<ItineraryDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error.message }, []);
            return response
        }

    }

    public async getById(value: any): Promise<GenericResponse<ItineraryDto[]>> {
        try {
            const { id } = value
            const existe = await this._itineraryRepository.find({ where: { id_itinerary: id }, relations: { idBus: true } })
            if (!existe) {
                const response = new GenericResponse<ItineraryDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: '' }, []);
                return response
            }

            const response = new GenericResponse<ItineraryDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, existe);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al obtener rol");

            }
            const response = new GenericResponse<ItineraryDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    public async create(itinerary: CreateItineraryDto): Promise<GenericResponse<ItineraryDto[]>> {
        const { typeSeatDetail, ...buss } = itinerary;
        try {
            const newItinerary = new CreateItineraryDto();
            newItinerary.id_itinerary = v4()
            newItinerary.cityOrigin = itinerary.cityOrigin
            newItinerary.cityDestination = itinerary.cityDestination
            newItinerary.hourExit = itinerary.hourExit
            newItinerary.hourArrival = itinerary.hourArrival
            newItinerary.dateExit = itinerary.dateExit
            newItinerary.dateArrival = itinerary.dateArrival
            newItinerary.cost = itinerary.cost
            newItinerary.idBus = itinerary.idBus
            newItinerary.status = itinerary.status

            const value: ItineraryDto = await this._itineraryRepository.save(newItinerary)
            if (value) {
                typeSeatDetail.map(x => {
                    const newTypeSeatDetail = new CreateTypeSeatDetailDto();
                    const ff = {
                        busy: x.busy,
                        idTypeSeat: {
                            id_type_seat: x.idTypeSeat.id_type_seat
                        },
                        idItinerary: {
                            id_itinerary: value.id_itinerary
                        }
                    }
                    this._typeSeatDetailService.create(ff)
                });
            }
            const response = new GenericResponse<ItineraryDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '201', message: '' }, [value]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al crear rol.");
            }
            const response = new GenericResponse<ItineraryDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error.message }, []);
            return response
        }
    }

    public async update(itinerary: UpdateItineraryDto, value: string): Promise<GenericResponse<ItineraryDto[]>> {
        const { typeSeatDetail, ...buss } = itinerary;
        const existe = await this._itineraryRepository.findOne({ where: { id_itinerary: value } })
        try {
            if (!existe) {
                const response = new GenericResponse<ItineraryDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: 'No existe' }, []);
                return response
            }

            const newItinerary = Object.assign(existe, buss)
            const value = await this._itineraryRepository.save(newItinerary)
            /*

            if (value) {
                typeSeatDetail.map(x => {
                    const newTypeSeatDetail = new CreateTypeSeatDetailDto();
                    const ff = {
                        busy: x.busy,
                        idTypeSeat: {
                            id_type_seat: x.idTypeSeat.id_type_seat
                        },
                        idItinerary: {
                            id_itinerary: value.id_itinerary
                        }
                    }
                    this._typeSeatDetailService.create(ff)
                });
            }
            */

            const response = new GenericResponse<ItineraryDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, [newItinerary]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("hubo un error al actualizar rol");
            }
            const response = new GenericResponse<ItineraryDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    public async delete(value: any): Promise<GenericResponse<ItineraryDto[]>> {
        try {
            const { id } = value
            const existe = await this._itineraryRepository.findOne({ where: { id_itinerary: id } })
            if (!existe) {
                const response = new GenericResponse<ItineraryDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: 'No existe' }, []);
                return response
            }

            await this._itineraryRepository.delete({ id_itinerary: id })

            const response = new GenericResponse<ItineraryDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '203', message: '' }, []);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al eliminar el rol");
            }
            const response = new GenericResponse<ItineraryDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error.message }, []);
            return response
        }
    }


}
