import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';
import { BadRequestException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UserDto, UpdateUserDto } from '../dto/user.dto';
import { v4 } from 'uuid'
import { ModelInterface } from './generic.interface';
import { GenericResponse } from '../response/generic.response';


@Injectable()
export class UserService implements ModelInterface<CreateUserDto, String>{
    constructor(
        @InjectRepository(User) private readonly _userRepository: UserRepository
    ) { }

    public async getAll(): Promise<GenericResponse<UserDto[]>> {
        try {
            let users: UserDto[] = await this._userRepository.find({ relations: { role: true } })
            const response = new GenericResponse<UserDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, users);
            return response
        } catch {
            const response = new GenericResponse<UserDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: '' }, []);
            return response
        }

    }

    public async getById(value: any): Promise<GenericResponse<UserDto[]>> {
        try {
            const { id } = value
            const existe = await this._userRepository.findOne({ where: { id_user: id }, relations: { role: true } })
            if (!existe) {
                const response = new GenericResponse<UserDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: '' }, []);
                return response
            }
            const response = new GenericResponse<UserDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, [existe]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al obtener rol");

            }
            const response = new GenericResponse<UserDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    public async create(user: CreateUserDto): Promise<GenericResponse<UserDto[]>> {
        try {
            const saltRound = 10
            const newUser = new CreateUserDto();
            newUser.id_user = v4()
            newUser.dni = user.dni
            newUser.name = user.name
            newUser.lastName = user.lastName
            newUser.username = user.username

            newUser.dateBirthday = user.dateBirthday
            newUser.role = user.role
            newUser.state = user.state


            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);

            newUser.password = hashedPassword


            const value: UserDto = await this._userRepository.save(newUser)
            const response = new GenericResponse<UserDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '201', message: '' }, [value]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al crear rol.");
            }
            const response = new GenericResponse<UserDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error.message }, []);
            return response
        }
    }

    public async update(user: UpdateUserDto, value: string): Promise<GenericResponse<UserDto[]>> {
        const existe = await this._userRepository.findOne({ where: { id_user: value } })
        try {
            if (!existe) {
                const response = new GenericResponse<UserDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: 'No existe' }, []);
                return response
            }
            const newUser = Object.assign(existe, user)
            const value = await this._userRepository.save(newUser)
            const response = new GenericResponse<UserDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '200', message: '' }, [newUser]);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("hubo un error al actualizar rol");
            }
            const response = new GenericResponse<UserDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }

    public async delete(value: any): Promise<GenericResponse<UserDto[]>> {
        try {
            const { id } = value
            const existe = await this._userRepository.findOne({ where: { id_user: id } })
            if (!existe) {
                const response = new GenericResponse<UserDto[]>(
                    { id_response: v4(), datetime: new Date().toISOString(), status: '400', message: 'No existe' }, []);
                return response
            }

            await this._userRepository.delete({ id_user: id })

            const response = new GenericResponse<UserDto[]>(
                { id_response: v4(), datetime: new Date().toISOString(), status: '203', message: '' }, []);
            return response
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new Error("Hubo un error al eliminar el rol");
            }
            const response = new GenericResponse<UserDto[]>({ id_response: v4(), datetime: new Date().toISOString(), status: '400', message: error }, []);
            return response
        }
    }


    async getUserByName(username: string): Promise<User> {
        try {
            return await this._userRepository.findOne({ where: { username }, relations: { role: true } });
        } catch (error) {
            return error.message
        }
    }


}
