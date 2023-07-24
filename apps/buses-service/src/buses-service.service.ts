import { Injectable } from '@nestjs/common';

@Injectable()
export class BusesServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
