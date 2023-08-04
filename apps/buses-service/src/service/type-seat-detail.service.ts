import { Injectable } from '@nestjs/common';
import { TypeSeatDetail } from '../entity/type-seat-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeSeatDetailRepository } from '../repository/type-seat-detail.repository';
import { BadRequestException } from '@nestjs/common/exceptions';
import { EntityRepository, Repository } from 'typeorm';

import { CreateTypeSeatDetailDto, TypeSeatDetailDto,UpdateTypeSeatDetailDto } from '../dto/type-seat-detail.dto';
import { v4 } from 'uuid'
import { ModelInterface } from './generic.interface';
import { GenericResponse } from '../response/generic.response';


@Injectable()
export class TypeSeatDetailService implements ModelInterface<TypeSeatDetailDto, String>{
    constructor(
        @InjectRepository(TypeSeatDetail) private readonly _typeSeatDetailRepository: TypeSeatDetailRepository
    ) { }

    public async getAll(): Promise<GenericResponse<TypeSeatDetailDto[]>> {
        try {
            let typeSeatDetails: TypeSeatDetailDto[] = await this._typeSeatDetailRepository.find({
                relations: {
                    idTypeSeat: true,
                    idItinerary: true
                }
            })
            const response = new GenericResponse<TypeSeatDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message:'' }, typeSeatDetails);
            return response
        } catch(error) {
            const response = new GenericResponse<TypeSeatDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:error.message }, []);
            return response
        }

    }

    public async getById(value: any): Promise<GenericResponse<TypeSeatDetailDto[]>> {
        try {
            const { id } = value
            const existe = await this._typeSeatDetailRepository.findOne({ where: {id_type_seat_detail: id}, relations: {                     
                idTypeSeat: true,
                idItinerary: true
            } })
            if (!existe) {
                const response = new GenericResponse<TypeSeatDetailDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:'' }, []);
                return response
            }
            const response = new GenericResponse<TypeSeatDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message:'' }, [existe]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al obtener bus");

            }
            const response = new GenericResponse<TypeSeatDetailDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    public async create(typeSeatDetail: any): Promise<GenericResponse<TypeSeatDetailDto[]>> {

        try {
            
            
            const newTypeSeatDetail = new CreateTypeSeatDetailDto();
            newTypeSeatDetail.id_type_seat_detail = v4()
            newTypeSeatDetail.idTypeSeat = typeSeatDetail.idTypeSeat
            newTypeSeatDetail.idItinerary = typeSeatDetail.idItinerary
            newTypeSeatDetail.busy = typeSeatDetail.busy
            const value: TypeSeatDetailDto = await this._typeSeatDetailRepository.save(newTypeSeatDetail)
            const response = new GenericResponse<TypeSeatDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '201', message:'' }, [value]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al crear bus.");
            }
            const response = new GenericResponse<TypeSeatDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:'' }, []);
            return response
        }
    }

    public async update(typeSeatDetail: UpdateTypeSeatDetailDto, value: string): Promise<GenericResponse<TypeSeatDetailDto[]>> {
        
        const existe = await this._typeSeatDetailRepository.findOne({ where: { id_type_seat_detail: value }})
        try {
            if (!existe) {
                const response = new GenericResponse<TypeSeatDetailDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:'No existe' }, []);
                return response
            }
            const newTypeSeatDetail= Object.assign(existe, typeSeatDetail)

            
            const value = await this._typeSeatDetailRepository.save(newTypeSeatDetail)
            const response = new GenericResponse<TypeSeatDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, [newTypeSeatDetail]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("hubo un error al actualizar bus");
            }
            const response = new GenericResponse<TypeSeatDetailDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    public async delete(value: any): Promise<GenericResponse<TypeSeatDetailDto[]>> {
        try {
            const { id } = value
            const existe = await this._typeSeatDetailRepository.findOne({ where: {id_type_seat_detail: id} })
            if (!existe) {
                const response = new GenericResponse<TypeSeatDetailDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:'No existe' }, []);
                return response
            }


            await this._typeSeatDetailRepository.delete({ id_type_seat_detail: id })

            const response = new GenericResponse<TypeSeatDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '203', message:'' }, []);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al eliminar el bus");
            }
            const response = new GenericResponse<TypeSeatDetailDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }


    public async deleteByIdBus(value: any): Promise<GenericResponse<TypeSeatDetailDto[]>> {
        try {
            const { id } = value

            let typeSeatDetails: TypeSeatDetailDto[] = await this._typeSeatDetailRepository.find({
                where: {idItinerary: {id_itinerary: id}}, 
                relations: {idTypeSeat: true}
            })


                  
            if(typeSeatDetails.length > 0){
                await this._typeSeatDetailRepository.remove(typeSeatDetails)
            }

            const response = new GenericResponse<TypeSeatDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message:'' }, []);
            return response
        } catch (error) {
            const response = new GenericResponse<TypeSeatDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:error.message }, []);
            return response
        }

    }


    public async getByPlate(value: any): Promise<GenericResponse<TypeSeatDetailDto[]>> {
        try {
            const { id } = value

            let typeSeatDetails: TypeSeatDetail[] = await this._typeSeatDetailRepository.find({ where: {idItinerary: { id_itinerary: id}}, relations: { idTypeSeat: true, idItinerary: true}})

           
            
            
            if (!typeSeatDetails) {
                const response = new GenericResponse<TypeSeatDetailDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '4004', message:'' }, []);
                return response
            }
            const response = new GenericResponse<TypeSeatDetailDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message:'' }, typeSeatDetails);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al obtener bus");

            }
            const response = new GenericResponse<TypeSeatDetailDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }
}
