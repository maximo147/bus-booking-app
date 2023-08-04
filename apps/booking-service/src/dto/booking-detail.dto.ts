
import { IsBoolean, IsOptional, IsNotEmpty } from "class-validator";
import { BookingDto } from "./booking.dto";
import { ItineraryDto } from "./itinerary.dto";
import { TypeSeatDetailDto } from "apps/buses-service/src/dto/type-seat-detail.dto";
import { UserDto } from "apps/user-service/src/dto/user.dto";


export class BookingDetailDto {
    id_booking_details: string;
    idBooking: BookingDto;
    idItinerary: ItineraryDto;
    idTypeSeatDetail: TypeSeatDetailDto
    status: boolean;
    user: UserDto;
    state: boolean;
}

export class CreateBookingDetailDto {
    id_booking_details: string;
    @IsNotEmpty()
    idBooking: BookingDto;
    @IsNotEmpty()
    idItinerary: ItineraryDto;
    @IsNotEmpty()
    idTypeSeatDetail: TypeSeatDetailDto
    @IsNotEmpty()
    status: boolean;
    @IsBoolean()
    state: boolean;
    @IsNotEmpty()
    user: UserDto;
}

export class UpdateBookingDetailDto {
    @IsOptional()
    idBooking?: BookingDto;
    @IsOptional()
    idItinerary?: ItineraryDto;
    @IsOptional()
    idTypeSeatDetail: TypeSeatDetailDto
    @IsOptional()
    status?: boolean;
    @IsOptional()
    state?: boolean;
    @IsOptional()
    user: UserDto;
}