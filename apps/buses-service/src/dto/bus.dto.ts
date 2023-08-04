
import { IsOptional, IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { TypeSeatDetailDto } from "./type-seat-detail.dto";

export class BusDto {
    id_bus: string;
    plate: string
    operatorName: string 
    operatorDni: string 
    brand: string
    minSeat: number
    amountTourist: number
    amountExecutive: number
    amountPremium: number
    state: boolean;
}



export class CreateBusDto {
    id_bus: string;
    @IsNotEmpty()
    plate: string
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    operatorName: string 
    @MinLength(3)
    @MaxLength(200)
    @IsNotEmpty()
    operatorDni: string 
    @IsNotEmpty()
    brand: string
    @IsNotEmpty()
    minSeat: number
    @IsNotEmpty()
    amountTourist: number
    @IsNotEmpty()
    amountExecutive: number
    @IsNotEmpty()
    amountPremium: number
    state?: boolean
}

export class UpdateBusDto {
    id_bus: string;
    @IsOptional()
    plate?: string
    @IsOptional()
    operatorName?: string 
    @IsOptional()
    operatorDni?: string 
    @IsOptional()
    brand?: string
    @IsOptional()
    minSeat?: number
    @IsOptional()
    amountTourist?: number
    @IsOptional()
    amountExecutive?: number
    @IsOptional()
    amountPremium?: number
    @IsOptional()
    state?: boolean;
}