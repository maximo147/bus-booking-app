import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BusService } from '../../service/buses-service/bus.service';


@Controller('api-v1/bus')
export class BusController {
    constructor(
        private readonly _busService: BusService
    ){}

    @Get()
    public getAllBus(): Observable<Response> {
        return this._busService.getAllBus()
    }

    @Get(':id')
    public getByIdBus(@Param() id: string): Observable<Response> {
        return this._busService.getByIdBus(id)
    }

    @Post()
    public createBus(@Body() t: Request): Observable<Response> {
        return this._busService.createBus(t)
    }

    @Patch(':id')
    public updateBus(@Param() id: string, @Body() t: Request): Observable<Response> {
        return this._busService.updateBus(t, id)
    }
    
    @Delete(':id')
    public deleteBus(@Param() id: string): Observable<Response> {
        return this._busService.deleteBus(id)
    }


}
