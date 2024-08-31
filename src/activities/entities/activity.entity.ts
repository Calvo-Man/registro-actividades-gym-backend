/* eslint-disable prettier/prettier */

import { Machine } from "src/machine/entities/machine.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Activity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    reps:number;

    @Column()
    lifted_weight:number

    @CreateDateColumn({ type: 'timestamp' }) // Columna que registra la fecha y hora de creación
    start_date: Date;

    @UpdateDateColumn({type:'timestamp'})
    end_date:number;

    @ManyToOne(()=>User,(user)=>user.activities)
    user:User

    @ManyToOne(()=>Machine,(machine)=>machine.activities)
    machine:Machine
}

