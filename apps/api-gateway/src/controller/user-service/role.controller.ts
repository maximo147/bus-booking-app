import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleService } from '../../service/user-service/role.service';


@Controller('api-v1/role')
export class RoleController {
    constructor(
        private readonly _roleService: RoleService
    ){}

    @Get()
    public getAllRole(): Observable<Response> {
        return this._roleService.getAllRole()
    }

    @Get(':id')
    public getByIdRole(@Param() id: string): Observable<Response> {
        return this._roleService.getByIdRole(id)
    }

    @Post()
    public createRole(@Body() t: Request): Observable<Response> {
        return this._roleService.createRole(t)
    }

    @Patch(':id')
    public updateRole(@Param() id: string, @Body() t: Request): Observable<Response> {
        return this._roleService.updateRole(t, id)
    }
    
    @Delete(':id')
    public deleteRole(@Param() id: string): Observable<Response> {
        return this._roleService.deleteRole(id)
    }


}
