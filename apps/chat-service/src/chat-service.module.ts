import { Module } from '@nestjs/common';
import { ChatServiceController } from './chat-service.controller';
import { ChatServiceService } from './chat-service.service';
import { WebSocketGateway } from '@nestjs/websockets';
import { RoleService } from 'apps/user-service/src/service/role.service';
import { User } from 'apps/user-service/src/entity/user.entity';
import { Role } from 'apps/user-service/src/entity/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingDetailService } from 'apps/booking-service/src/service/booking-detail.service';
import { BookingDetail } from 'apps/booking-service/src/entity/booking-detail.entity';
import { TypeSeatDetail } from 'apps/buses-service/src/entity/type-seat-detail.entity';
import { Booking } from 'apps/booking-service/src/entity/booking.entity';
import { Itinerary } from 'apps/booking-service/src/entity/itinerary.entity';
import { TypeSeat } from 'apps/buses-service/src/entity/type-seat.entity';
import { Bus } from 'apps/buses-service/src/entity/bus.entity';
import { TypeSeatDetailService } from 'apps/buses-service/src/service/type-seat-detail.service';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'bus_booking',
          entities: [Role, User, BookingDetail, TypeSeatDetail, Booking, Itinerary, TypeSeat, Bus],
          synchronize: true
      }),
      TypeOrmModule.forFeature([Role, User, BookingDetail, TypeSeatDetail, Booking, Itinerary, TypeSeat, Bus])
  ],
  controllers: [ChatServiceController],
  providers: [ChatServiceService,RoleService, BookingDetailService, TypeSeatDetailService],
})
export class ChatServiceModule {}
