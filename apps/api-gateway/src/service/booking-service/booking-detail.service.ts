import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class BookingDetailService {
    constructor(
        @Inject('BOOKING_DETAIL_SERVICE') private _bookingDetailService: ClientProxy
    ){}


    public getAllBookingDetail(): Observable<Response>{
        return this._bookingDetailService.send({role: 'bookingDetail', cmd: 'get_bookingDetail'}, 1)
    }

    public getByIdBookingDetail(id: string): Observable<Response>{
        return this._bookingDetailService.send({role: 'bookingDetail', cmd: 'getById_bookingDetail'}, id)
    }

    public createBookingDetail(bookingDetail: Request): Observable<Response>{
        return this._bookingDetailService.send({role: 'bookingDetail', cmd: 'create_bookingDetail'}, bookingDetail)
    }

    public updateBookingDetail(bookingDetail: Request, value: string): Observable<Response>{
        return this._bookingDetailService.send({role: 'bookingDetail', cmd: 'update_bookingDetail'}, {bookingDetail, value})
    }

    public deleteBookingDetail(id: string): Observable<Response>{
        return this._bookingDetailService.send({role: 'bookingDetail', cmd: 'delete_bookingDetail'}, id)
    }


    public getAllByUser(id: string): Observable<Response>{
        return this._bookingDetailService.send({role: 'bookingDetail', cmd: 'getbyUser_bookingDetail'}, id)
    }

}
