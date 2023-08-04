
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

    @Entity()
    export class Role {
        @PrimaryColumn({name: 'id_role'})
        id_role: string;
        @Column({ name: 'name', unique: true, length: 200 })
        name: string;
        @Column({ name: 'description', length: 200 })
        description: string;
        @OneToMany(() => User, user => user.role)
        users: User[];
        @Column({ name: 'state', default: true })
        state: boolean;
    }