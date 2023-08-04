import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class TypeSeatService {
    constructor(
        @Inject('TYPE_SEAT_SERVICE') private _typeSeatService: ClientProxy
    ){}


    public getAllTypeSeat(): Observable<Response>{
        return this._typeSeatService.send({role: 'typeSeat', cmd: 'get_typeSeat'}, 1)
    }

    public getByIdTypeSeat(id: string): Observable<Response>{
        return this._typeSeatService.send({role: 'typeSeat', cmd: 'getById_typeSeat'}, id)
    }

    public createTypeSeat(typeSeat: Request): Observable<Response>{
        return this._typeSeatService.send({role: 'typeSeat', cmd: 'create_typeSeat'}, typeSeat)
    }

    public updateTypeSeat(typeSeat: Request, value: string): Observable<Response>{
        return this._typeSeatService.send({role: 'typeSeat', cmd: 'update_typeSeat'}, {typeSeat, value})
    }

    public deleteTypeSeat(id: string): Observable<Response>{
        return this._typeSeatService.send({role: 'typeSeat', cmd: 'delete_typeSeat'}, id)
    }
}
