import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { RoleController } from './controller/user-service/role.controller';
import { UserController } from './controller/user-service/user.controller';

import { RoleService } from './service/user-service/role.service';
import { UserService } from './service/user-service/user.service';
import { TypeSeatController } from './controller/buses-service/type-seat.controller';
import { TypeSeatService } from './service/buses-service/type-seat.service';
import { BusController } from './controller/buses-service/bus.controller';
import { BusService } from './service/buses-service/bus.service';
import { TypeSeatDetailController } from './controller/buses-service/type-seat-detail.controller';
import { TypeSeatDetailService } from './service/buses-service/type-seat-detail.service';
import { BookingController } from './controller/booking-service/booking.controller';
import { BookingService } from './service/booking-service/booking.service';
import { ItineraryController } from './controller/booking-service/itinerary.controller';
import { ItineraryService } from './service/booking-service/itinerary.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BookingDetailController } from './controller/booking-service/booking-detail.controller';
import { BookingDetailService } from './service/booking-service/booking-detail.service';
import { AuthLoginController } from './controller/auth/auth-login.controller';
import { AuthLoginService } from './service/auth/auth-login.service';
import { JwtService } from '@nestjs/jwt';




@Module({
  imports: [

    ClientsModule.register([
      {
        name: 'ROLE_SERVICE', transport: Transport.TCP, options: {
          host: 'localhost',
          port: 3001
        }
      }
    ]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE', transport: Transport.TCP, options: {
          host: 'localhost',
          port: 3001
        }
      }
    ]),
    ClientsModule.register([
      {
        name: 'TYPE_SEAT_SERVICE', transport: Transport.TCP, options: {
          host: 'localhost',
          port: 3002
        }
      }
    ]),
    ClientsModule.register([
      {
        name: 'TYPE_SEAT_SERVICE_DETAIL', transport: Transport.TCP, options: {
          host: 'localhost',
          port: 3002
        }
      }
    ]),    
    ClientsModule.register([
      {
        name: 'BUS_SERVICE', transport: Transport.TCP, options: {
          host: 'localhost',
          port: 3002
        }
      }
    ]),
    ClientsModule.register([
      {
        name: 'BOOKING_SERVICE', transport: Transport.TCP, options: {
          host: 'localhost',
          port: 3003
        }
      }
    ]),
    ClientsModule.register([
      {
        name: 'ITINERARY_SERVICE', transport: Transport.TCP, options: {
          host: 'localhost',
          port: 3003
        }
      }
    ]),
    ClientsModule.register([
      {
        name: 'BOOKING_DETAIL_SERVICE', transport: Transport.TCP, options: {
          host: 'localhost',
          port: 3003
        }
      }
    ]),

    ScheduleModule.forRoot()
  ],
  controllers: [RoleController, UserController, 
    TypeSeatController, BusController, TypeSeatDetailController,
     BookingController, ItineraryController, BookingDetailController, AuthLoginController],
  providers: [RoleService, UserService, TypeSeatService, BusService, 
    TypeSeatDetailService, BookingService, ItineraryService,
     BookingDetailService, AuthLoginService, JwtService],
})
export class AppModule { }
