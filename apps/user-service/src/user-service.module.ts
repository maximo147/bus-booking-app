import { Module } from '@nestjs/common';
import { RoleController } from './controller/role.controller';
import { RoleService } from './service/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './entity/role.entity';
import { User } from './entity/user.entity';

import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'bus_booking',
        entities: [Role, User],
        synchronize: true
    }),
    TypeOrmModule.forFeature([Role, User])
  ],
  controllers: [RoleController, UserController],
  providers: [RoleService, UserService],
})
export class UserServiceModule { }
