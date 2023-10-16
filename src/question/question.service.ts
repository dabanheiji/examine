import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { In, Like, Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { TypeEnum } from '../enum';
import { QuestionListVo } from './vo/question-list.vo';
import { Category } from './entities/category.entity';
import { QuestionInfoVo } from './vo/question-info.vo';
import { plainToClass } from 'class-transformer';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryVo } from './vo/category.vo';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { TestPaper } from '../test_paper/entities/test_paper.entity';

@Injectable()
export class QuestionService {
  @InjectRepository(Question)
  private questionRepository: Repository<Question>;

  @InjectRepository(Answer)
  private answerRepository: Repository<Answer>;

  @InjectRepository(Category)
  private categoryRespository: Repository<Category>;

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const newQuestion = new Question();
      newQuestion.context = createQuestionDto.context;
      newQuestion.image = createQuestionDto.image;
      newQuestion.type = createQuestionDto.type;
      const categorys: Category[] = [];
      for (const categoryId of createQuestionDto.categorys) {
        const category = await this.categoryRespository.findOneBy({
          id: categoryId,
        });
        categorys.push(category);
      }
      newQuestion.categorys = categorys;

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
      throw new HttpException('添加失败', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(
    pageNo: number,
    pageSize: number,
    context?: string,
    type?: TypeEnum,
    category?: string,
  ) {
    const skipCount = (pageNo - 1) * pageSize;
    const where: Record<string, any> = {};
    if (context) {
      where.context = Like(`%${context}%`);
    }
    if (type) {
      where.type = type;
    }
    if (category) {
      where.category = category;
    }
    const [list, total] = await this.questionRepository.findAndCount({
      where,
      skip: skipCount,
      take: pageSize,
    });
    const vo = new QuestionListVo();
    vo.list = list;
    vo.total = total;
    return vo;
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOne({
      where: {
        id,
      },
      relations: {
        categorys: true,
        answers: true,
      },
    });

    if (!question) {
      throw new HttpException('此题目不存在', HttpStatus.BAD_REQUEST);
    }

    const vo = plainToClass(QuestionInfoVo, question);

    return vo;
  }

  async update(updateQuestionDto: UpdateQuestionDto) {
    try {
      const question = await this.questionRepository.findOne({
        where: {
          id: updateQuestionDto.id,
        },
        relations: {
          categorys: true,
          answers: true,
        },
      });

      question.categorys = question.categorys.filter((category) =>
        updateQuestionDto.categorys.includes(category.id),
      );

      const answers: Answer[] = [];
      for (const answer of updateQuestionDto.answers) {
        if (answer.id) {
          answers.push(
            await this.answerRepository.findOneBy({ id: answer.id }),
          );
        } else {
          const instance = new Answer();
          instance.context = answer.context;
          instance.isRight = answer.isRight;
          instance.question = question;
          answers.push(await this.answerRepository.save(instance));
        }
      }
      question.answers = answers;
      await this.questionRepository.update(question, {
        id: updateQuestionDto.id,
      });

      return '修改成功';
    } catch (error) {
      throw new HttpException('修改失败', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const question = await this.questionRepository.findOneBy({ id });
      await this.questionRepository.remove(question);
      return '删除成功';
    } catch (error) {
      throw new HttpException('删除失败', HttpStatus.BAD_REQUEST);
    }
  }

  async categoryCreate(categoryCreateDto: CreateCategoryDto) {
    try {
      const category = new Category();
      category.name = categoryCreateDto.name;
      if (categoryCreateDto.parentId) {
        const parent = await this.categoryRespository.findOneBy({
          id: categoryCreateDto.parentId,
        });
        category.parent = parent;
      }
      await this.categoryRespository.save(category);
      return '添加成功';
    } catch (error) {
      throw new HttpException('添加失败', HttpStatus.BAD_REQUEST);
    }
  }

  async categoryFindAll() {
    const category = await this.categoryRespository.find({
      where: {
        parent: null,
      },
      relations: {
        children: true,
      },
    });

    const vo = plainToClass(CategoryVo, category);
    return vo;
  }

  async categoryUpdate(updateQuestionDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRespository.findOneBy({
        id: updateQuestionDto.id,
      });
      category.name = updateQuestionDto.name;
      if (updateQuestionDto.parentId) {
        const parent = await this.categoryRespository.findOneBy({
          id: updateQuestionDto.parentId,
        });
        category.parent = parent;
      }
      await this.categoryRespository.update(category, {
        id: updateQuestionDto.id,
      });

      return '更新成功';
    } catch (error) {
      throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
    }
  }

  async categoryRemove(id: number) {
    try {
      const category = await this.categoryRespository.findOneBy({ id });
      await this.categoryRespository.remove(category);
      return '删除成功';
    } catch (error) {
      throw new HttpException('删除失败', HttpStatus.BAD_REQUEST);
    }
  }

  async addQuestionOnPaper(testPaper: TestPaper, questionIds: number[]) {
    const questions = await this.questionRepository.find({
      where: {
        id: In(questionIds),
      },
      relations: {
        papers: true,
      },
    });
    questions.forEach((q) => {
      q.papers.push(testPaper);
    });
    await this.questionRepository.save(questions);
  }
}
