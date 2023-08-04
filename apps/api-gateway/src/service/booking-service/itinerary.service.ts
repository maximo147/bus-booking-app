import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ItineraryService {
    constructor(
        @Inject('ITINERARY_SERVICE') private _itineraryService: ClientProxy
    ){}


    public getAllItinerary(): Observable<Response>{
        return this._itineraryService.send({role: 'itinerary', cmd: 'get_itinerary'}, 1)
    }

    public getByIdItinerary(id: string): Observable<Response>{
        return this._itineraryService.send({role: 'itinerary', cmd: 'getById_itinerary'}, id)
    }

    public createItinerary(itinerary: Request): Observable<Response>{
        return this._itineraryService.send({role: 'itinerary', cmd: 'create_itinerary'}, itinerary)
    }

    public updateItinerary(itinerary: Request, value: string): Observable<Response>{
        return this._itineraryService.send({role: 'itinerary', cmd: 'update_itinerary'}, {itinerary, value})
    }

    public deleteItinerary(id: string): Observable<Response>{
        return this._itineraryService.send({role: 'itinerary', cmd: 'delete_itinerary'}, id)
    }
}
