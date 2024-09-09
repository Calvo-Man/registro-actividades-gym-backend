/* eslint-disable prettier/prettier */

import { Exercise } from "src/exercises/entities/exercise.entity";
import { Machine } from "src/machine/entities/machine.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Activity {

    @PrimaryGeneratedColumn()
    id: number;

    
    @ManyToOne(()=>Exercise,(exercise)=>exercise.activity)
    exercise:Exercise
    
    @ManyToOne(()=>Machine,(machine)=>machine.activities)
    machine:Machine

    @Column()
    reps:number;

    @Column()
    lifted_weight:number

    @Column({type:"datetime"}) // Columna que registra la fecha y hora de creación
    start_date: Date;

    @Column({type:"datetime"})
    end_date:Date;

    @Column({nullable:true})
    duration:number

    @ManyToOne(()=>User,(user)=>user.activities,{ eager: true })
    user:User


}

