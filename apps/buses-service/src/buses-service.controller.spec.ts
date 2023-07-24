import { Test, TestingModule } from '@nestjs/testing';
import { BusesServiceController } from './buses-service.controller';
import { BusesServiceService } from './buses-service.service';

describe('BusesServiceController', () => {
  let busesServiceController: BusesServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BusesServiceController],
      providers: [BusesServiceService],
    }).compile();

    busesServiceController = app.get<BusesServiceController>(BusesServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(busesServiceController.getHello()).toBe('Hello World!');
    });
  });
});
