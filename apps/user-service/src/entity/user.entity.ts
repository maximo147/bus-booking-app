
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "./role.entity";

    @Entity()
    export class User {
        @PrimaryColumn({ name: 'id_user'})
        id_user: string;
        @Column({ name: 'dni', length: 9, unique: true })
        dni: string;
        @Column({ name: 'name', length: 200 })
        name: string;
        @Column({ name: 'last_name', length: 200 })
        lastName: string;
        @Column({ name: 'username', length: 200, unique: true })
        username: string;
        @Column({ name: 'password', length: 200 })
        password: string;
        @Column({ name: 'date_birthday', type: 'date' })
        dateBirthday: Date;
        @ManyToOne(() => Role, role => role.users)
        @JoinColumn({name: 'id_role'})
        role: Role;
        @Column({ name: 'state', default: true })
        state: boolean;

        async validatePassword(password: string) : Promise<boolean> {
            return await bcrypt.compareSync(password, this.password)
        }
        
    }