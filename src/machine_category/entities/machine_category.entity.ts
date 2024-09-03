/* eslint-disable prettier/prettier */
import { Exercise } from "src/exercises/entities/exercise.entity";
import { Machine } from "src/machine/entities/machine.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MachineCategory {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true,nullable:false})
    category:string

    @OneToMany(()=>Machine,(machine)=>machine.machineCategory)
    machine:Machine[]

    @OneToMany(()=>Exercise,(exercise)=>exercise.machineCategory)
    exercise:Exercise[]

    
}
