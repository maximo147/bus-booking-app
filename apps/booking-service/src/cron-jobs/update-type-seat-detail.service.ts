import { Injectable, Logger } from '@nestjs/common';
import { BookingDetailService } from '../service/booking-detail.service';
import { Cron } from '@nestjs/schedule';
import { TypeSeatDetailRepository } from 'apps/buses-service/src/repository/type-seat-detail.repository';
import { TypeSeatDetail } from 'apps/buses-service/src/entity/type-seat-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, getManager } from "typeorm"
import { TypeSeatDetailService } from 'apps/buses-service/src/service/type-seat-detail.service';

@Injectable()
export class UpdateTypeSeatDeailService {
    private readonly logger = new Logger(UpdateTypeSeatDeailService.name)
    private executeCron = false
    private object: any
    constructor(
        private readonly _bookingDetailService: BookingDetailService,
        private readonly _typeSeatDetaiolService: TypeSeatDetailService,
        @InjectRepository(TypeSeatDetail) private readonly _typeSeatDetailRepository: TypeSeatDetailRepository
    ) { }

    @Cron('*/3 * * * * *')
    async handleCron() {
        this.logger.debug("Cron Update TypeSeat Iniciado")
        try {
            const reservas = (await this._bookingDetailService.getAll()).getData()
            reservas.map(async x => {
                const update = await this._typeSeatDetailRepository.find({ where: { id_type_seat_detail: x.idTypeSeatDetail.id_type_seat_detail } })
                if(update){
                    for(const data of update){
                        data.busy= 'OCUPADO'
                        await this._typeSeatDetaiolService.update(data, data.id_type_seat_detail)
                    }  
                }   
            })
        } catch {

        }
        this.logger.debug("Cron Update TypeSeat Termminado")


    }





}