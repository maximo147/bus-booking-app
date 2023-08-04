import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class RoleService {
    constructor(
        @Inject('ROLE_SERVICE') private _roleService: ClientProxy
    ) { }

    private readonly logger = new Logger(RoleService.name)


    public getAllRole(): Observable<Response> {
        return this._roleService.send({ role: 'role', cmd: 'get_role' }, 1)
    }

    public getByIdRole(id: string): Observable<Response> {
        return this._roleService.send({ role: 'role', cmd: 'getById_role' }, id)
    }

    public createRole(role: Request): Observable<Response> {
        return this._roleService.send({ role: 'role', cmd: 'create_role' }, role)
    }

    public updateRole(role: Request, value: string): Observable<Response> {
        return this._roleService.send({ role: 'role', cmd: 'update_role' }, { role, value })
    }

    public deleteRole(id: string): Observable<Response> {
        return this._roleService.send({ role: 'role', cmd: 'delete_role' }, id)
    }





}
