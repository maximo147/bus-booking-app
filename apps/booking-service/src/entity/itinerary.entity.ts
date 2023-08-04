
import { Bus } from "apps/buses-service/src/entity/bus.entity";
import { TypeSeatDetail } from "apps/buses-service/src/entity/type-seat-detail.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";


@Entity()
export class Itinerary {
    @PrimaryColumn({ name: 'id_itinerary' })
    id_itinerary: string;
    @Column({ name: 'city_origin', length: 200 })
    cityOrigin: string;
    @Column({ name: 'city_destination', length: 200 })
    cityDestination: string;
    @Column({ name: 'hour_exit' })
    hourExit: string;
    @Column({ name: 'hour_arrival' })
    hourArrival: string;
    
    @Column({ name: 'date_exit', type: 'date' })
    dateExit: Date;
    @Column({ name: 'date_arrival', type: 'date' })
    dateArrival: Date;
    @Column({ name: 'cost' })
    cost: number;
    @Column({ name: 'status' })
    status: string;
    @ManyToOne(() => Bus, bus => bus.id_bus, { cascade: true })
    @JoinColumn({ name: 'id_bus' })
    idBus: Bus;
    @Column({ name: 'state', default: true })
    state: boolean;

    @OneToMany(() => TypeSeatDetail, typeSeatDetail => typeSeatDetail.id_type_seat_detail, { cascade: true})
    typeSeatDetail: TypeSeatDetail[]
}