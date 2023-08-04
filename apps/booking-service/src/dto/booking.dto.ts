
import { UserDto } from "apps/user-service/src/dto/user.dto";
import { IsBoolean, IsOptional, IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { BookingDetailDto } from "./booking-detail.dto";



export class BookingDto {
    id_booking: string;
    dateBooking: Date;
    costTotal: number;
    user: UserDto;
    bookingDetail: BookingDetailDto[]
    state: boolean;
}


export class CreateBookingDto {
    id_booking: string;
    @IsNotEmpty()
    dateBooking: Date;
    @IsNotEmpty()
    costTotal: number;
    @IsNotEmpty()
    user: UserDto;
    bookingDetail: BookingDetailDto[]
    @IsBoolean()
    state: boolean;
}

export class UpdateBookingDto {
    @IsOptional()
    dateBooking?: Date;
    @IsOptional()
    costTotal?: number;
    @IsOptional()
    user?: UserDto;
    bookingDetail: BookingDetailDto[]
    @IsOptional()
    state?: boolean;
}