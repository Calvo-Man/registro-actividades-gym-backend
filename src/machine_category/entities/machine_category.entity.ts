/* eslint-disable prettier/prettier */
import { Machine } from "src/machine/entities/machine.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MachineCategory {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    category:string

    @OneToMany(()=>Machine,(machine)=>machine.machineCategory)
    machines:Machine
}
