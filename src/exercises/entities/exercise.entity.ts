/* eslint-disable prettier/prettier */

import { Activity } from "src/activities/entities/activity.entity";
import { MachineCategory } from "src/machine_category/entities/machine_category.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exercise {

    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    name:string

    @OneToMany(()=>Activity,(activity)=>activity.exercise)
    activity:Activity[]

    @ManyToOne(()=>MachineCategory,(machineCategory)=>machineCategory.exercise)
    machineCategory:MachineCategory
}
