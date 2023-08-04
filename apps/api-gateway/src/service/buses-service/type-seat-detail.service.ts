import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';
import { Observable } from 'rxjs';

@Injectable()
export class TypeSeatDetailService {
    constructor(
        @Inject('TYPE_SEAT_SERVICE') private _typeSeatDetailService: ClientProxy
    ){}


    public getAllTypeSeatDetail(): Observable<Response>{
        return this._typeSeatDetailService.send({role: 'typeSeatDetail', cmd: 'get_typeSeatDetail'}, 1)
    }

    public getByIdTypeSeatDetail(id: string): Observable<Response>{
        return this._typeSeatDetailService.send({role: 'typeSeatDetail', cmd: 'getById_typeSeatDetail'}, id)
    }

    public createTypeSeatDetail(typeSeatDetail: Request): Observable<Response>{
        return this._typeSeatDetailService.send({role: 'typeSeatDetail', cmd: 'create_typeSeatDetail'}, typeSeatDetail)
    }

    public updateTypeSeatDetail(typeSeatDetail: Request, value: string): Observable<Response>{
        return this._typeSeatDetailService.send({role: 'typeSeatDetail', cmd: 'update_typeSeatDetail'}, {typeSeatDetail, value})
    }

    public deleteTypeSeatDetail(id: string): Observable<Response>{
        return this._typeSeatDetailService.send({role: 'typeSeatDetail', cmd: 'delete_typeSeatDetail'}, id)
    }

    public deleteByIdBusTypeSeatDetail(id: string): Observable<Response>{
        return this._typeSeatDetailService.send({role: 'typeSeatDetail', cmd: 'deleteByIdBus_typeSeatDetail'}, id)
    }
    
    public getByplateTypeSeatDetail(id: string): Observable<Response>{
        return this._typeSeatDetailService.send({role: 'typeSeatDetail', cmd: 'getByPlate_typeSeatDetail'}, id)
    }

}
