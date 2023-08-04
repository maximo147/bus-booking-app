
import { TypeSeatService } from '../../service/buses-service/type-seat.service';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';

@Controller('api-v1/type-seat')
export class TypeSeatController {
    constructor(
        private readonly _typeSeatService: TypeSeatService
    ){}

    @Get()
    public getAllTypeSeat(): Observable<Response> {
        return this._typeSeatService.getAllTypeSeat()
    }

    @Get(':id')
    public getByIdTypeSeat(@Param() id: string): Observable<Response> {
        return this._typeSeatService.getByIdTypeSeat(id)
    }

    @Post()
    public createTypeSeat(@Body() t: Request): Observable<Response> {
        return this._typeSeatService.createTypeSeat(t)
    }

    @Patch(':id')
    public updateTypeSeat(@Param() id: string, @Body() t: Request): Observable<Response> {
        return this._typeSeatService.updateTypeSeat(t, id)
    }
    
    @Delete(':id')
    public deleteTypeSeat(@Param() id: string): Observable<Response> {
        return this._typeSeatService.deleteTypeSeat(id)
    }

}
