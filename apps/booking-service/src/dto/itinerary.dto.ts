
import { IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { BusDto } from "apps/buses-service/src/dto/bus.dto";
import { TypeSeatDetailDto } from "apps/buses-service/src/dto/type-seat-detail.dto";





export class ItineraryDto {
    id_itinerary: string;
    cityOrigin: string;
    cityDestination: string;
    hourExit: string;
    hourArrival: string;
    dateExit: Date;
    dateArrival: Date;
    cost: number;
    status: string;
    idBus: BusDto;
    state: boolean;
    typeSeatDetail: TypeSeatDetailDto[]
}

export class CreateItineraryDto {
    id_itinerary: string;
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    cityOrigin: string;
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    cityDestination: string;
    @IsNotEmpty()
    hourExit: string;
    @IsNotEmpty()
    hourArrival: string;
    @IsNotEmpty()
    dateExit: Date;
    @IsNotEmpty()
    dateArrival: Date;
    @IsNotEmpty()
    cost: number;
    @IsNotEmpty()
    status: string;
    @IsNotEmpty()
    idBus: BusDto;
    @IsBoolean()
    state: boolean;
    typeSeatDetail: TypeSeatDetailDto[]
}

export class UpdateItineraryDto {
    cityOrigin?: string;
    @IsOptional()
    cityDestination?: string;
    @IsOptional()
    hourExit?: string;
    @IsOptional()
    hourArrival?: string;
    @IsOptional()
    dateExit: Date;
    @IsOptional()
    dateArrival: Date;
    @IsOptional()
    cost?: number;
    @IsOptional()
    status?: string;
    @IsOptional()
    idBus?: BusDto;
    @IsOptional()
    state?: boolean;
    @IsOptional()
    typeSeatDetail?: TypeSeatDetailDto[]
}