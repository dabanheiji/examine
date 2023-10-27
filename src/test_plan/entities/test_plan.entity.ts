import { Dept } from 'src/dept/entities/dept.entity';
import { TestPaper } from 'src/test_paper/entities/test_paper.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TestPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  passMark: number;

  @CreateDateColumn()
  createTime: Date;
  updateTime: Date;

  @ManyToOne(() => TestPaper, (testPaper) => testPaper.testPlans)
  paper: TestPaper;
  createBy: User;
  updateBy: User;
  depts: Dept[];
  users: User[];
}
