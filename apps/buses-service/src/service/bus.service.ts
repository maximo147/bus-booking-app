import { v4 } from 'uuid'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ModelInterface } from './generic.interface';
import { GenericResponse } from '../response/generic.response';
import { BusRepository } from '../repository/bus.repository';
import { BusDto, CreateBusDto, UpdateBusDto } from '../dto/bus.dto';
import { CreateTypeSeatDetailDto, TypeSeatDetailDto } from '../dto/type-seat-detail.dto';
import { TypeSeatDetailService } from './type-seat-detail.service';
import { Bus } from '../entity/bus.entity';


@Injectable()
export class BusService implements ModelInterface<BusDto, String>{
    constructor(
        @InjectRepository(Bus) private readonly _busRepository: BusRepository,
        private _typeSeatDetailService: TypeSeatDetailService
    ) { }

    public async getAll(): Promise<GenericResponse<BusDto[]>> {
        try {
            let buses: BusDto[] = await this._busRepository.find()
            const response = new GenericResponse<BusDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, buses);
            return response
        } catch {
            const response = new GenericResponse<BusDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: '' }, []);
            return response
        }

    }

    public async getById(value: any): Promise<GenericResponse<BusDto[]>> {
        try {
            const { id } = value
            const existe = await this._busRepository.findOne({ where: { id_bus: id } })
            if (!existe) {
                const response = new GenericResponse<BusDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: '' }, []);
                return response
            }
            const response = new GenericResponse<BusDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, [existe]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al obtener bus");
            }
            const response = new GenericResponse<BusDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    public async create(bus: CreateBusDto): Promise<GenericResponse<BusDto[]>> {
        //const { typeSeatDetail, ...buss } = bus;
        try {
            const newBus = new CreateBusDto();
            newBus.id_bus = v4();
            newBus.plate = bus.plate;
            newBus.operatorName = bus.operatorName;
            newBus.operatorDni = bus.operatorDni;
            newBus.brand = bus.brand;
            newBus.minSeat = bus.minSeat;
            newBus.amountTourist = bus.amountTourist;
            newBus.amountExecutive = bus.amountExecutive;
            newBus.amountPremium = bus.amountPremium;
           

            const value = await this._busRepository.save(newBus);

            /*
            if (value) {
                typeSeatDetail.map(x => {
                    const newtype = new CreateTypeSeatDetailDto();
                    newtype.id_type_seat_detail = v4();
                    newtype.busy = x.busy;
                    newtype.idTypeSeat = x.idTypeSeat;
                    newtype.idBus = value;
                    this._typeSeatDetailService.create(newtype)
                });
            }
            */
            
            const response = new GenericResponse<BusDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '201', message: '' }, [value]);
            return response;

        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al crear bus.");
            }
            const response = new GenericResponse<BusDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error.name }, []);
            return response;
        }
    }

    public async update(bus: UpdateBusDto, value: string): Promise<GenericResponse<BusDto[]>> {
        //const { typeSeatDetail, ...buss } = bus;
        const existe = await this._busRepository.findOne({ where: { id_bus: value }})
        try {
            if (!existe) {
                const response = new GenericResponse<BusDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: 'No existe' }, []);
                return response
            }
        
            const newBus = Object.assign(existe, bus)
            const value = await this._busRepository.save(newBus);
            /*
            if (value) {
                typeSeatDetail.map(x => {
                    const newtype = new CreateTypeSeatDetailDto();
                    newtype.id_type_seat_detail = v4();
                    newtype.busy = x.busy;
                    newtype.idTypeSeat = x.idTypeSeat;
                    newtype.idBus = value;
                    this._typeSeatDetailService.create(newtype)
                });
            }
            */

            const response = new GenericResponse<BusDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, [value]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("hubo un error al actualizar bus");
            }
            const response = new GenericResponse<BusDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error.message }, []);
            return response
        }
    }

    public async delete(value: any): Promise<GenericResponse<BusDto[]>> {
        try {
            const { id } = value
            const existe = await this._busRepository.findOne({ where: { id_bus: id } })
            if (!existe) {
                const response = new GenericResponse<BusDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: 'No existe' }, []);
                return response
            }

            await this._busRepository.delete({ id_bus: id })

            const response = new GenericResponse<BusDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '203', message: '' }, []);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al eliminar el bus");
            }
            const response = new GenericResponse<BusDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }
}
