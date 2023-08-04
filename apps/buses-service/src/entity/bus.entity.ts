
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TypeSeatDetail } from "./type-seat-detail.entity";
import { Max, Min } from "class-validator";
import { Itinerary } from "apps/booking-service/src/entity/itinerary.entity";


    @Entity()
    export class Bus {
        @PrimaryColumn({name: 'id_bus'})
        id_bus: string;
        @Column({ name: 'plate', unique: true })
        plate: string
        @Column({ name: 'operator_name' })
        operatorName: string
        @Column({ name: 'operator_dni' })
        operatorDni: string 
        @Column({ name: 'brand'})
        brand: string
        @Min(20)
        @Column({ name: 'min_seat' })
        minSeat: number
        @Max(35)
        @Column({ name: 'amount_tourist' })
        amountTourist: number
        @Column({ name: 'amount_executive' })
        amountExecutive: number
        @Column({ name: 'amount_premium' })
        amountPremium: number
        @Column({ name: 'state', default: true })
        state: boolean;
    }

