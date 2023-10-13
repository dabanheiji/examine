import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';

@Injectable()
export class QuestionService {
  @InjectRepository(Question)
  private questionRepository: Repository<Question>;

  @InjectRepository(Answer)
  private answerRepository: Repository<Answer>;

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const newQuestion = new Question();
      newQuestion.context = createQuestionDto.context;
      newQuestion.image = createQuestionDto.image;
      newQuestion.type = createQuestionDto.type;
      const question = await this.questionRepository.save(newQuestion);

      for (const item of createQuestionDto.answers) {
        const answer = new Answer();
        answer.context = item.context;
        answer.isRight = item.isRight;
        answer.question = question;
        await this.answerRepository.insert(answer);
      }

      return '添加成功';
    } catch (error) {
      return '添加失败';
    }
  }

  findAll() {
    return `This action returns all question`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
