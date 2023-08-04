import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { Observable } from 'rxjs';
import { ItineraryService } from '../../service/booking-service/itinerary.service';




@Controller('api-v1/itinerary')
export class ItineraryController {
    constructor(
        private readonly _itineraryService: ItineraryService
    ){}

    @Get()
    public getAllItinerary(): Observable<Response> {
        return this._itineraryService.getAllItinerary()
    }

    @Get(':id')
    public getByIdItinerary(@Param() id: string): Observable<Response> {
        return this._itineraryService.getByIdItinerary(id)
    }

    @Post()
    public createItinerary(@Body() t: Request): Observable<Response> {
        return this._itineraryService.createItinerary(t)
    }

    @Patch(':id')
    public updateItinerary(@Param() id: string, @Body() t: Request): Observable<Response> {
        return this._itineraryService.updateItinerary(t, id)
    }
    
    @Delete(':id')
    public deleteItinerary(@Param() id: string): Observable<Response> {
        return this._itineraryService.deleteItinerary(id)
    }


}
