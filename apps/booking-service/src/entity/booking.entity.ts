
import { User } from "apps/user-service/src/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { BookingDetail } from "./booking-detail.entity";


    @Entity()
    export class Booking {
        @PrimaryColumn({ name: 'id_booking'})
        id_booking: string;
        @Column({ name: 'date_booking'})
        dateBooking: Date;
        @Column({ name: 'cost_total' })
        costTotal: number;
        @ManyToOne(() => User, user => user.id_user)
        @JoinColumn({name: 'id_user'})
        user: User;
        @Column({ name: 'state', default: true })
        state: boolean;
        @OneToMany(() => BookingDetail, bookingDetail => bookingDetail.idBooking)
        bookingDetail: BookingDetail[]
    }