/* eslint-disable prettier/prettier */
import { Activity } from "src/activities/entities/activity.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    email:string

    @Column({nullable:false})
    password: string;

    @Column()
    name:string

    @Column()
    age:number

    @Column()
    weight:number

    @Column()
    height:number

    @CreateDateColumn({ type: 'timestamp' }) // Columna que registra la fecha y hora de creación
    createdAt: Date;

    @DeleteDateColumn({type:'timestamp'})
    deletedAt: Date;

    @ManyToOne(()=>Role,(role)=>role.users)
    role:Role

    @OneToMany(()=>Activity,(activity)=>activity.user)
    activities:Activity[]


}
