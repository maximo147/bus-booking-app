import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BookingService } from '../../service/booking-service/booking.service';



@Controller('api-v1/booking')
export class BookingController {
    constructor(
        private readonly _bookingService: BookingService
    ){}

    @Get()
    public getAllBooking(): Observable<Response> {
        return this._bookingService.getAllBooking()
    }

    @Get(':id')
    public getByIdBooking(@Param() id: string): Observable<Response> {
        return this._bookingService.getByIdBooking(id)
    }

    @Post()
    public createBooking(@Body() t: Request): Observable<Response> {
        return this._bookingService.createBooking(t)
    }

    @Patch(':id')
    public updateBooking(@Param() id: string, @Body() t: Request): Observable<Response> {
        return this._bookingService.updateBooking(t, id)
    }
    
    @Delete(':id')
    public deleteBooking(@Param() id: string): Observable<Response> {
        return this._bookingService.deleteBooking(id)
    }


}
