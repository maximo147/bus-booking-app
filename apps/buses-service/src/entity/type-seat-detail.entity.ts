
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { TypeSeat } from "./type-seat.entity";
import { Bus } from "./bus.entity";
import { Itinerary } from "apps/booking-service/src/entity/itinerary.entity";

@Entity()
export class TypeSeatDetail {
    @PrimaryColumn({ name: 'id_type_seat_detail' })
    id_type_seat_detail: string;

    @Column({ name: 'busy', length: 100 })
    busy: string;
    @Column({ name: 'state', default: true })
    state: boolean;

    @ManyToOne(() => TypeSeat, typeSeat => typeSeat.id_type_seat, { cascade: true })
    @JoinColumn({name: 'id_type_seat'})
    idTypeSeat: TypeSeat;
    

    @ManyToOne(() => Itinerary, itinerary => itinerary.id_itinerary,{ onUpdate: 'CASCADE', onDelete: 'CASCADE', cascade: true})
    @JoinColumn({ name: 'id_itinerary' })
    idItinerary: Itinerary;
}
