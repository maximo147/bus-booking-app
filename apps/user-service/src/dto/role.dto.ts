
import { IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class RoleDto {
    id_role: string;
    name: string;
    description: string;
    state: boolean;
}

export class CreateRoleDto {
    id_role: string;
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    name: string;
    @IsNotEmpty()
    description: string;
    state: boolean;
}

export class UpdateRoleDto {
    @IsOptional()
    @IsNotEmpty()
    name?: string;
    @IsOptional()
    @IsNotEmpty()
    description?: string;
    @IsOptional()
    @IsBoolean()
    state?: boolean;
}