import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity({
  name: 'categorys',
})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '分类名称',
  })
  name: string;

  @ManyToOne(() => Category, (category) => category.children)
  parent: Category | null;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @ManyToMany(() => Question, (question) => question.categorys)
  questions: Question[];
}
