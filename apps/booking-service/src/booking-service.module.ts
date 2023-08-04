import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './controller/booking.controller';
import { BookingService } from './service/booking.service';
import { User } from 'apps/user-service/src/entity/user.entity';
import { Role } from 'apps/user-service/src/entity/role.entity';
import { Bus } from 'apps/buses-service/src/entity/bus.entity';
import { TypeSeatDetail } from 'apps/buses-service/src/entity/type-seat-detail.entity';
import { TypeSeat } from 'apps/buses-service/src/entity/type-seat.entity';
import { Booking } from './entity/booking.entity';
import { Itinerary } from './entity/itinerary.entity';
import { ItineraryController } from './controller/itinerary.controller';
import { ItineraryService } from './service/itinerary.service';
import { BookingDetail } from './entity/booking-detail.entity';
import { BookingDetailController } from './controller/booking-detail.controller';
import { BookingDetailService } from './service/booking-detail.service';
import { TypeSeatDetailService } from 'apps/buses-service/src/service/type-seat-detail.service';
import { UpdateCartService } from './cron-jobs/update-cart.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UpdateTypeSeatDeailService } from './cron-jobs/update-type-seat-detail.service';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'bus_booking',
          entities: [Booking, User, Role, Itinerary, Bus, TypeSeatDetail, TypeSeat, BookingDetail],
          synchronize: true
      }),
      TypeOrmModule.forFeature([Booking, User,Role, Itinerary, Bus, TypeSeatDetail, TypeSeat, BookingDetail]),
      ScheduleModule.forRoot()
      
  ],
  controllers: [BookingController, ItineraryController, BookingDetailController],
  providers: [BookingService, ItineraryService, BookingDetailService, TypeSeatDetailService, UpdateCartService, UpdateTypeSeatDeailService],
})
export class BookingServiceModule {}
