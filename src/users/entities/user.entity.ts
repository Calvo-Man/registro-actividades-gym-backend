/* eslint-disable prettier/prettier */
import moment from 'moment-timezone';
import { Activity } from 'src/activities/entities/activity.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  weight: number;

  @Column()
  height: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;
  @BeforeInsert()
  setCreatedAt() {
    // Configura la zona horaria a la que quieres convertir
    this.createdAt = moment().tz('America/Bogota').toDate();
  }
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Activity, (activity) => activity.user)
  activities: Activity[];
}
