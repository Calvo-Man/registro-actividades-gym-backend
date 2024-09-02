/* eslint-disable prettier/prettier */
import { Activity } from "src/activities/entities/activity.entity";
import { MachineCategory } from "src/machine_category/entities/machine_category.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Machine {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true,nullable:false})
    name:string

    @Column()
    max_weight:number

    @OneToMany(()=>Activity,(activity)=>activity.machine)
    activities:Activity[]

    @ManyToOne(()=>MachineCategory,(machineCategory)=>machineCategory.machine)
    machineCategory:MachineCategory
}
