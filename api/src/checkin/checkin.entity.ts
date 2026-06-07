import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';
@Entity()
export class Checkin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  taskId: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Task)
  task: Task;
  
  @CreateDateColumn()
  completedAt: Date;
}