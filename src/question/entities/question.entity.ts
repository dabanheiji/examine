import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from './answer.entity';

import { QuestionTypeEnum } from '../../enum';
import { Category } from './category.entity';
import { TestPaper } from '../../test_paper/entities/test_paper.entity';

@Entity({
  name: 'questions',
})
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '题目',
    length: 300,
  })
  context: string;

  @Column({
    comment: '类型',
    type: 'enum',
    enum: QuestionTypeEnum,
  })
  type: QuestionTypeEnum;

  @Column({
    comment: '图片',
    default: '',
  })
  image: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @JoinTable()
  @ManyToMany(() => Category, (category) => category.questions)
  categorys: Category[];

  @JoinTable()
  @ManyToMany(() => TestPaper, (testPaper) => testPaper.questions)
  papers: TestPaper[];
}
