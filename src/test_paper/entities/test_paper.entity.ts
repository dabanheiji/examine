import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from '../../question/entities/question.entity';

@Entity({
  name: 'test_papers',
})
export class TestPaper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '试卷名称',
  })
  name: string;

  @Column({
    comment: '单选题每题分数',
    default: 0,
  })
  radioRank: number;

  @Column({
    comment: '多选题每题分数',
    default: 0,
  })
  checkboxRank: number;

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
}
