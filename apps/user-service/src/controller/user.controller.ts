import { Controller, Body, Post, Get, Param, Patch } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';


import { CreateUserDto, UserDto, UpdateUserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { GenericResponse } from '../response/generic.response';
import { User } from '../entity/user.entity';

@Controller()

export class UserController {
    constructor(
        private readonly _userService: UserService
    ){}

    @MessagePattern({role: 'user', cmd: 'get_user'})
    async getAll(): Promise<GenericResponse<UserDto[]>>{
        return await this._userService.getAll()
    }


    @MessagePattern({role: 'user', cmd: 'getById_user'})
    async getById(id: string): Promise<GenericResponse<UserDto[]>>{
        return await this._userService.getById(id)
    }

    @MessagePattern({role: 'user', cmd: 'create_user'})
    async create(@Body() user: CreateUserDto): Promise<GenericResponse<UserDto[]>>{
        try{
             return await this._userService.create(user)
        }catch(error) {
            throw new Error("Hubo un error al guardar");
        }
    }

    @MessagePattern({role: 'user', cmd: 'update_user'})
    async update(@Body() users: any): Promise<GenericResponse<UserDto[]>>{
        try{
            const { user, value } = users
            const { id } = value
            
             return await this._userService.update(user, id)
        }catch(error) {
            throw new Error("Hubo un error al editar");
        }
    }

    @MessagePattern({role: 'user', cmd: 'delete_user'})
    async delete(id: string): Promise<GenericResponse<UserDto[]>>{
        return await this._userService.delete(id)
    }


    @MessagePattern({role: 'user', cmd: 'getByName_user'})
    async getUserByName(username: string): Promise<User>{
        return await this._userService.getUserByName(username)
    }
}
