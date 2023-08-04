import { Injectable } from '@nestjs/common';
import { TypeSeat } from '../entity/type-seat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeSeatRepository } from '../repository/type-seat.repository';
import { BadRequestException } from '@nestjs/common/exceptions';

import { CreateTypeSeatDto, TypeSeatDto, UpdateTypeSeatDto } from '../dto/type-seat.dto';
import { v4 } from 'uuid'
import { ModelInterface } from './generic.interface';
import { GenericResponse } from '../response/generic.response';


@Injectable()
export class TypeSeatService implements ModelInterface<TypeSeatDto, String>{
    constructor(
        @InjectRepository(TypeSeat) private readonly _typeSeatRepository: TypeSeatRepository
    ) { }

    public async getAll(): Promise<GenericResponse<TypeSeatDto[]>> {
        try {
            let typeSeats: TypeSeatDto[] = await this._typeSeatRepository.find()
            const response = new GenericResponse<TypeSeatDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message:'' }, typeSeats);
            return response
        } catch {
            const response = new GenericResponse<TypeSeatDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:'' }, []);
            return response
        }

    }

    public async getById(value: any): Promise<GenericResponse<TypeSeatDto[]>> {
        try {
            const { id } = value
            const existe = await this._typeSeatRepository.findOne({ where: {id_type_seat: id} })
            if (!existe) {
                const response = new GenericResponse<TypeSeatDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:'' }, []);
                return response
            }
            const response = new GenericResponse<TypeSeatDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message:'' }, [existe]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al obtener rol");

            }
            const response = new GenericResponse<TypeSeatDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    public async create(typeSeat: CreateTypeSeatDto): Promise<GenericResponse<TypeSeatDto[]>> {
        try {
            const newTypeSeat = new CreateTypeSeatDto();
            newTypeSeat.id_type_seat = v4()
            newTypeSeat.name = typeSeat.name
            newTypeSeat.serviceAdditional = typeSeat.serviceAdditional;
            newTypeSeat.costAdditional = typeSeat.costAdditional;

            const value: TypeSeatDto = await this._typeSeatRepository.save(newTypeSeat)
            const response = new GenericResponse<TypeSeatDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '201', message:'' }, [value]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al crear rol.");
            }
            const response = new GenericResponse<TypeSeatDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:'' }, []);
            return response
        }
    }

    public async update(typeSeat: UpdateTypeSeatDto, value: string): Promise<GenericResponse<TypeSeatDto[]>> {
        const existe = await this._typeSeatRepository.findOne({ where: { id_type_seat: value }})
        try {
            if (!existe) {
                const response = new GenericResponse<TypeSeatDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:'No existe' }, []);
                return response
            }
            const newTypeSeat= Object.assign(existe, typeSeat)
            const value = await this._typeSeatRepository.save(newTypeSeat)
            const response = new GenericResponse<TypeSeatDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, [newTypeSeat]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("hubo un error al actualizar rol");
            }
            const response = new GenericResponse<TypeSeatDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    public async delete(value: any): Promise<GenericResponse<TypeSeatDto[]>> {
        try {
            const { id } = value
            const existe = await this._typeSeatRepository.findOne({ where: {id_type_seat: id} })
            if (!existe) {
                const response = new GenericResponse<TypeSeatDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:'No existe' }, []);
                return response
            }

            await this._typeSeatRepository.delete({ id_type_seat: id })

            const response = new GenericResponse<TypeSeatDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '203', message:'' }, []);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al eliminar el rol");
            }
            const response = new GenericResponse<TypeSeatDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }


}
