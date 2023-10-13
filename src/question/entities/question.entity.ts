import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Answer } from './answer.entity';

import { TypeEnum } from '../enum';

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
    enum: TypeEnum,
  })
  type: TypeEnum;

  @Column({
    comment: '图片',
    default: '',
  })
  image: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
