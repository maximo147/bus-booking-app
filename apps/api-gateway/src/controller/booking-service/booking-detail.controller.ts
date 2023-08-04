import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BookingDetailService } from '../../service/booking-service/booking-detail.service';


@Controller('api-v1/booking-detail')
export class BookingDetailController {
    constructor(
        private readonly _bookingDetailService: BookingDetailService
    ){}

    @Get()
    public getAllBookingDetail(): Observable<Response> {
        return this._bookingDetailService.getAllBookingDetail()
    }

    @Get(':id')
    public getByIdBookingDetail(@Param() id: string): Observable<Response> {
        return this._bookingDetailService.getByIdBookingDetail(id)
    }

    @Get('by-user/:id')
    public getAllByUser(@Param() id: string): Observable<Response> {
        return this._bookingDetailService.getAllByUser(id)
    }

    @Post()
    public createBookingDetail(@Body() t: Request): Observable<Response> {
        return this._bookingDetailService.createBookingDetail(t)
    }

    @Patch(':id')
    public updateBookingDetail(@Param() id: string, @Body() t: Request): Observable<Response> {
        return this._bookingDetailService.updateBookingDetail(t, id)
    }
    
    @Delete(':id')
    public deleteBookingDetail(@Param() id: string): Observable<Response> {
        return this._bookingDetailService.deleteBookingDetail(id)
    }


}
