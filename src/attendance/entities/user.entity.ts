import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  department: string;

  @Column()
  studentId: number;

  @OneToMany(type => Attendance, attendance => attendance.user)
  attendance: Attendance;
}