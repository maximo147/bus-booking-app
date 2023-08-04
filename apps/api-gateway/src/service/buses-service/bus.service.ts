import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class BusService {
    constructor(
        @Inject('BUS_SERVICE') private _busService: ClientProxy
    ){}


    public getAllBus(): Observable<Response>{
        return this._busService.send({role: 'bus', cmd: 'get_bus'}, 1)
    }

    public getByIdBus(id: string): Observable<Response>{
        return this._busService.send({role: 'bus', cmd: 'getById_bus'}, id)
    }

    public createBus(bus: Request): Observable<Response>{
        return this._busService.send({role: 'bus', cmd: 'create_bus'}, bus)
    }

    public updateBus(bus: Request, value: string): Observable<Response>{
        return this._busService.send({role: 'bus', cmd: 'update_bus'}, {bus, value})
    }

    public deleteBus(id: string): Observable<Response>{
        return this._busService.send({role: 'bus', cmd: 'delete_bus'}, id)
    }
}
