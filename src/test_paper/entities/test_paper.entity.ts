import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { PaperTypeEnum } from 'src/enum';
import { TestPlan } from 'src/test_plan/entities/test_plan.entity';

@Entity({
  name: 'test_papers',
})
export class TestPaper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '试卷名称',
    length: 50,
  })
  name: string;

  @Column({
    comment: '试卷描述',
    default: '',
    length: 500,
  })
  desc: string;

  @Column({
    type: 'enum',
    enum: PaperTypeEnum,
  })
  type: PaperTypeEnum;

  @Column({
    comment: '单选题目数量',
  })
  radioCount: number;

  @Column({
    comment: '单选题每题分数',
    default: 0,
  })
  radioRank: number;

  @Column({
    comment: '多选题目数量',
  })
  checkboxCount: number;

  @Column({
    comment: '多选题每题分数',
    default: 0,
  })
  checkboxRank: number;

  @Column({
    comment: '判断提目数量',
  })
  determineCount: number;

  @Column({
    comment: '判断题每题分数',
    default: 0,
  })
  determineRank: number;

  @Column({
    comment: '创建人',
  })
  createBy: string;

  @Column({
    comment: '更新人',
  })
  updateBy: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Question, (question) => question.papers)
  questions: Question[];

  @OneToMany(() => TestPlan, (testPlan) => testPlan.paper)
  testPlans: TestPlan[];
}
