import { Injectable, Logger } from '@nestjs/common';
import { BookingDetailService } from '../service/booking-detail.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UpdateCartService {
    private readonly logger = new Logger(UpdateCartService.name)
    private executeCron = false
    private object: any
    constructor(
        private readonly _bookingDetailService: BookingDetailService
    ) { }

    @Cron('30 * * * * *')
    
    async handleCron() {
        if (this.executeCron) {
            this.logger.debug("Cron Iniciado")
            try {
                await this._bookingDetailService.updateCart(this.object)
            } catch {
                
            }
            this.logger.debug("Cron Termminado")
        }
        this.executeCron =  false
    }

    startCron(bookingDetail: any) {
        this.executeCron = true
        this.object = bookingDetail
    }

}
