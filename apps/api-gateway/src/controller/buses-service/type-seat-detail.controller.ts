import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TypeSeatDetailService } from '../../service/buses-service/type-seat-detail.service';
 


@Controller('api-v1/type-seat-detail')
export class TypeSeatDetailController {
    constructor(
        private readonly _typeSeatDetailService: TypeSeatDetailService
    ){}

    @Get()
    public getAllTypeSeatDetail(): Observable<Response> {
        return this._typeSeatDetailService.getAllTypeSeatDetail()
    }

    @Get(':id')
    public getByIdTypeSeatDetail(@Param() id: string): Observable<Response> {
        return this._typeSeatDetailService.getByIdTypeSeatDetail(id)
    }

    @Post()
    public createTypeSeatDetail(@Body() t: Request): Observable<Response> {
        return this._typeSeatDetailService.createTypeSeatDetail(t)
    }

    @Patch(':id')
    public updateTypeSeatDetail(@Param() id: string, @Body() t: Request): Observable<Response> {
        return this._typeSeatDetailService.updateTypeSeatDetail(t, id)
    }
    
    @Delete(':id')
    public deleteTypeSeatDetail(@Param() id: string): Observable<Response> {
        return this._typeSeatDetailService.deleteTypeSeatDetail(id)
    }

    @Delete('by-bus/:id')
    public deleteByIdBus(@Param() id: string): Observable<Response> {
        return this._typeSeatDetailService.deleteByIdBusTypeSeatDetail(id)
    }

    @Get('by-plate/:id')
    public getByplateTypeSeatDetail(@Param() id: string): Observable<Response> {
        return this._typeSeatDetailService.getByplateTypeSeatDetail(id)
    }

}
