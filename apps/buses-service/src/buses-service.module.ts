import { Module } from '@nestjs/common';
import { BusesServiceController } from './buses-service.controller';
import { BusesServiceService } from './buses-service.service';

@Module({
  imports: [],
  controllers: [BusesServiceController],
  providers: [BusesServiceService],
})
export class BusesServiceModule {}
