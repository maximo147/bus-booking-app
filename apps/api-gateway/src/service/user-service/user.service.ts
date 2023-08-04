import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'apps/user-service/src/entity/user.entity';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_SERVICE') private _userService: ClientProxy
    ){}


    public getAllUser(): Observable<Response>{
        return this._userService.send({role: 'user', cmd: 'get_user'}, 1)
    }

    public getByIdUser(id: string): Observable<Response>{
        return this._userService.send({role: 'user', cmd: 'getById_user'}, id)
    }

    public createUser(user: Request): Observable<Response>{
        return this._userService.send({role: 'user', cmd: 'create_user'}, user)
    }

    public updateUser(user: Request, value: string): Observable<Response>{
        return this._userService.send({role: 'user', cmd: 'update_user'}, {user, value})
    }

    public deleteUser(id: string): Observable<Response>{
        return this._userService.send({role: 'user', cmd: 'delete_user'}, id)
    }

    public getByName(username: string):  Observable<User>{
        return this._userService.send({role: 'user', cmd: 'getByName_user'}, username)
    }
}
