import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeSeatDetail } from "../entity/type-seat-detail.entity";
import { Repository } from "typeorm";
import { Cron } from '@nestjs/schedule';


@Injectable()
export class ChangeStateSeatService {

    private readonly logger = new Logger(ChangeStateSeatService.name)
    constructor(
        @InjectRepository(TypeSeatDetail) private typeSeatRepository: Repository<TypeSeatDetail>
    ){}

    /*
    @Cron('30 * * * * *')
    async changeStatusTypeSeat(){
        try{
            const details = await this.typeSeatRepository.find({where: { busy: 'PENDIENTE' }})
            for(const item of details){
                item.busy = 'LIBRE'
                await this.typeSeatRepository.save(item)
            }
        }catch{

        }
    }
    */

}