import { Dept } from 'src/dept/entities/dept.entity';
import { TestPaper } from 'src/test_paper/entities/test_paper.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TestPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desc: string;
  paper: TestPaper;
  passMark: number;
  createTime: Date;
  updateTime: Date;
  createBy: User;
  updateBy: User;
  depts: Dept[];
  users: User[];
}
