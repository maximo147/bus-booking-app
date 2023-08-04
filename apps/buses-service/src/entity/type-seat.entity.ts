
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";


@Entity()
export class TypeSeat {
    @PrimaryColumn({ name: 'id_typeSeat' })
    id_type_seat: string;
    @Column({ name: 'name', unique: true, length: 200 })
    name: string;
    @Column({ name: 'service_additional', length: 200 })
    serviceAdditional: string
    @Column({ name: 'cost_additional' })
    costAdditional: number
    @Column({ name: 'state', default: true })
    state: boolean
}