import { Injectable } from '@nestjs/common';
import { Role } from '../entity/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../repository/role.repository';
import { BadRequestException } from '@nestjs/common/exceptions';

import { CreateRoleDto, RoleDto, UpdateRoleDto } from '../dto/role.dto';
import { v4 } from 'uuid'
import { ModelInterface } from './generic.interface';
import { GenericResponse } from '../response/generic.response';


@Injectable()
export class RoleService implements ModelInterface<CreateRoleDto, String>{
    constructor(
        @InjectRepository(Role) private readonly _roleRepository: RoleRepository
    ) { }

    public async getAll(): Promise<GenericResponse<RoleDto[]>> {
        try {
            let roles: RoleDto[] = await this._roleRepository.find()
            const response = new GenericResponse<RoleDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message:'' }, roles);
            return response
        } catch {
            const response = new GenericResponse<RoleDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:'' }, []);
            return response
        }

    }

    public async getById(value: any): Promise<GenericResponse<RoleDto[]>> {
        try {
            const { id } = value
            const existe = await this._roleRepository.findOne({ where: {id_role: id} })
            if (!existe) {
                const response = new GenericResponse<RoleDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:'' }, []);
                return response
            }
            const response = new GenericResponse<RoleDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message:'' }, [existe]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al obtener rol");

            }
            const response = new GenericResponse<RoleDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    public async create(role: CreateRoleDto): Promise<GenericResponse<RoleDto[]>> {
        try {
            const newRole = new CreateRoleDto();
            newRole.id_role = v4()
            newRole.name = role.name
            newRole.description = role.description
            newRole.state = role.state

            const value: RoleDto = await this._roleRepository.save(newRole)
            const response = new GenericResponse<RoleDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '201', message:'' }, [value]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al crear rol.");
            }
            const response = new GenericResponse<RoleDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:'' }, []);
            return response
        }
    }

    public async update(role: UpdateRoleDto, value: string): Promise<GenericResponse<RoleDto[]>> {
        const existe = await this._roleRepository.findOne({ where: { id_role: value }})
        try {
            if (!existe) {
                const response = new GenericResponse<RoleDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:'No existe' }, []);
                return response
            }
            const newRole= Object.assign(existe, role)
            const value = await this._roleRepository.save(newRole)
            const response = new GenericResponse<RoleDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, [newRole]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("hubo un error al actualizar rol");
            }
            const response = new GenericResponse<RoleDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    public async delete(value: any): Promise<GenericResponse<RoleDto[]>> {
        try {
            const { id } = value
            const existe = await this._roleRepository.findOne({ where: {id_role: id} })
            if (!existe) {
                const response = new GenericResponse<RoleDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message:'No existe' }, []);
                return response
            }

            await this._roleRepository.delete({ id_role: id })

            const response = new GenericResponse<RoleDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '203', message:'' }, []);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al eliminar el rol");
            }
            const response = new GenericResponse<RoleDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }


}
