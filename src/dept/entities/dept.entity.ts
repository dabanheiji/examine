import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Dept {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '名字',
    length: 50,
  })
  name: string;

  @ManyToOne(() => Dept, (dept) => dept.children)
  parent: Dept;

  @OneToMany(() => Dept, (dept) => dept.parent)
  children: Dept[];
}
