import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity({
  name: 'answers',
})
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '答案',
    length: 100,
  })
  context: string;

  @Column({
    comment: '是否是正确答案',
  })
  isRight: boolean;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}
