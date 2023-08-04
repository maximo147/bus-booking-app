import { Controller, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';


import { CreateRoleDto, RoleDto, UpdateRoleDto } from '../dto/role.dto';
import { RoleService } from '../service/role.service';
import { GenericResponse } from '../response/generic.response';

@Controller()

export class RoleController {
    constructor(
        private readonly _roleService: RoleService
    ){}

    @MessagePattern({role: 'role', cmd: 'get_role'})
    async getAll(): Promise<GenericResponse<RoleDto[]>>{
        return await this._roleService.getAll()
    }


    @MessagePattern({role: 'role', cmd: 'getById_role'})
    async getById(id: string): Promise<GenericResponse<RoleDto[]>>{
        return await this._roleService.getById(id)
    }

    @MessagePattern({role: 'role', cmd: 'create_role'})
    async create(@Body() role: CreateRoleDto): Promise<GenericResponse<RoleDto[]>>{
        try{
             return await this._roleService.create(role)
        }catch(error) {
            throw new Error("Hubo un error al guardar");
        }
    }

    @MessagePattern({role: 'role', cmd: 'update_role'})
    async update(@Body() roles: any): Promise<GenericResponse<RoleDto[]>>{
        try{
            const { role, value } = roles
            const { id } = value
            
             return await this._roleService.update(role, id)
        }catch(error) {
            throw new Error("Hubo un error al editar");
        }
    }

    @MessagePattern({role: 'role', cmd: 'delete_role'})
    async delete(id: string): Promise<GenericResponse<RoleDto[]>>{
        return await this._roleService.delete(id)
    }

}
