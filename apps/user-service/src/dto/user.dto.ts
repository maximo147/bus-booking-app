
import { IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { RoleDto } from "./role.dto";





export class UserDto {
    id_user: string;
    dni: string;
    name: string;
    lastName: string;
    username: string;
    password: string;
    dateBirthday: Date;
    role: RoleDto;
    state: boolean;
}

export class CreateUserDto {
    id_user: string;
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(8)
    dni: string;
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    name: string;
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    lastName: string;
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    dateBirthday: Date;
    @IsNotEmpty()
    role: RoleDto;
    @IsBoolean()
    state: boolean;
}

export class UpdateUserDto {
    @IsOptional()
    @MinLength(8)
    @MaxLength(8)
    dni?: string;
    @IsOptional()
    @MinLength(3)
    @MaxLength(200)
    name?: string;
    @IsOptional()
    @MinLength(3)
    @MaxLength(200)
    lastName?: string;
    @IsOptional()
    username?: string;
    @IsOptional()
    password?: string;
    @IsOptional()
    dateBirthday?: Date;
    @IsOptional()
    role?: RoleDto;
    @IsOptional()
    state?: boolean;
}