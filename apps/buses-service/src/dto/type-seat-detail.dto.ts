
import { IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { BusDto } from "./bus.dto";
import { TypeSeatDto } from "./type-seat.dto";
import { ItineraryDto } from "apps/booking-service/src/dto/itinerary.dto";

export class TypeSeatDetailDto {
    id_type_seat_detail: string;
    idTypeSeat: TypeSeatDto;
    busy: string;
    state: boolean;
    idItinerary: ItineraryDto;
}

export class CreateTypeSeatDetailDto {
    id_type_seat_detail: string;
    @IsNotEmpty()
    idTypeSeat: TypeSeatDto;
    @IsNotEmpty()
    busy: string;
    @IsNotEmpty()
    idItinerary: ItineraryDto;
}

export class UpdateTypeSeatDetailDto {
    @IsOptional()
    idTypeSeat?: TypeSeatDto;
    @IsOptional()
    busy?: string;
    @IsOptional()
    state?: boolean;
    @IsOptional()
    idItinerary?: ItineraryDto;
}