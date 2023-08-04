import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../service/user-service/user.service';


@Controller('api-v1/user')
export class UserController {
    constructor(
        private readonly _userService: UserService
    ){}

    @Get()
    public getAllUser(): Observable<Response> {
        return this._userService.getAllUser()
    }

    @Get(':id')
    public getByIdUser(@Param() id: string): Observable<Response> {
        return this._userService.getByIdUser(id)
    }

    @Post()
    public createUser(@Body() t: Request): Observable<Response> {
        return this._userService.createUser(t)
    }

    @Patch(':id')
    public updateUser(@Param() id: string, @Body() t: Request): Observable<Response> {
        return this._userService.updateUser(t, id)
    }
    
    @Delete(':id')
    public deleteUser(@Param() id: string): Observable<Response> {
        return this._userService.deleteUser(id)
    }


}
