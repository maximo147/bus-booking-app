
import { IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class TypeSeatDto {
    id_type_seat: string;
    name: string;
    serviceAdditional: string
    costAdditional: number
    state: boolean
}

export class CreateTypeSeatDto {
    id_type_seat: string;
    @IsNotEmpty()
    name: string;
    serviceAdditional: string
    costAdditional: number

}

export class UpdateTypeSeatDto {
    @IsOptional()
    name?: string;
    @IsOptional()
    serviceAdditional?: string
    @IsOptional()
    costAdditional?: number
    @IsOptional()
    state?: boolean
}