
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Booking } from "./booking.entity";
import { Itinerary } from "./itinerary.entity";
import { TypeSeatDetail } from "apps/buses-service/src/entity/type-seat-detail.entity";
import { User } from "apps/user-service/src/entity/user.entity";


    @Entity()
    export class BookingDetail {
        @PrimaryColumn({ name: 'id_booking_details'})
        id_booking_details: string;
        @ManyToOne(() => Booking, booking => booking.id_booking, { onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true})
        @JoinColumn({ name: 'id_booking' })
        idBooking: Booking;
        @ManyToOne(() => Itinerary, itinerary => itinerary.id_itinerary, { cascade: true })
        @JoinColumn({ name: 'id_itinerary'})
        idItinerary: Itinerary;
        @ManyToOne(() => TypeSeatDetail, typeSeat => typeSeat.idTypeSeat)
        @JoinColumn({ name: 'id_type_seat_detail'})
        idTypeSeatDetail: TypeSeatDetail
        @Column({ name: 'status', default: false })
        status: boolean;
        @Column({ name: 'state', default: true })
        state: boolean;
        @ManyToOne(() => User, user => user.id_user)
        @JoinColumn({name: 'id_user'})
        user: User;
    }