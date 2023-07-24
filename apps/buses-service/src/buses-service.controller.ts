import { Controller, Get } from '@nestjs/common';
import { BusesServiceService } from './buses-service.service';

@Controller()
export class BusesServiceController {
  constructor(private readonly busesServiceService: BusesServiceService) {}

  @Get()
  getHello(): string {
    return this.busesServiceService.getHello();
  }
}
