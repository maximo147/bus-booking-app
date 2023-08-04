import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class BookingService {
    constructor(
        @Inject('BOOKING_SERVICE') private _bookingService: ClientProxy
    ){}


    public getAllBooking(): Observable<Response>{
        return this._bookingService.send({role: 'booking', cmd: 'get_booking'}, 1)
    }

    public getByIdBooking(id: string): Observable<Response>{
        return this._bookingService.send({role: 'booking', cmd: 'getById_booking'}, id)
    }

    public createBooking(booking: Request): Observable<Response>{
        return this._bookingService.send({role: 'booking', cmd: 'create_booking'}, booking)
    }

    public updateBooking(booking: Request, value: string): Observable<Response>{
        return this._bookingService.send({role: 'booking', cmd: 'update_booking'}, {booking, value})
    }

    public deleteBooking(id: string): Observable<Response>{
        return this._bookingService.send({role: 'booking', cmd: 'delete_booking'}, id)
    }
}
