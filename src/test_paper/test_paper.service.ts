import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { CreateTestPaperDto } from './dto/create-test_paper.dto';
import { UpdateTestPaperDto } from './dto/update-test_paper.dto';
import { Like, Repository } from 'typeorm';
import { TestPaper } from './entities/test_paper.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionService } from '../question/question.service';
import { TestPaperVo } from './vo/test-paper.vo';
import { TestPaperDetailVo } from './vo/test-paper-detail.vo';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TestPaperService {
  @InjectRepository(TestPaper)
  private testPaperRepository: Repository<TestPaper>;

  @Inject(QuestionService)
  private questionService: QuestionService;

  async create(createTestPaperDto: CreateTestPaperDto) {
    try {
      const paper = new TestPaper();
      paper.name = createTestPaperDto.name;
      paper.desc = createTestPaperDto.desc;
      paper.radioCount = createTestPaperDto.radioCount;
      paper.radioRank = createTestPaperDto.radioRank;
      paper.checkboxCount = createTestPaperDto.checkboxCount;
      paper.checkboxRank = createTestPaperDto.checkboxRank;
      paper.determineCount = createTestPaperDto.determineCount;
      paper.determineRank = createTestPaperDto.determineRank;
      const questions = await this.questionService.findQuestionsInIds(
        createTestPaperDto.questions,
      );
      paper.questions = questions;
      await this.testPaperRepository.save(paper);

      return '添加成功';
    } catch (e) {
      throw new HttpException('添加失败', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(pageNo: number, pageSize: number, name: string) {
    const skipCount = (pageNo - 1) * pageSize;
    const where: Record<string, any> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }
    const [list, total] = await this.testPaperRepository.findAndCount({
      where,
      skip: skipCount,
      take: pageSize,
    });
    const vo = new TestPaperVo();
    vo.list = list;
    vo.total = total;
    return vo;
  }

  async findOne(id: number) {
    const paper = await this.testPaperRepository.findOne({
      where: {
        id,
      },
      relations: {
        questions: {
          answers: true,
        },
      },
    });
    const vo = plainToClass(TestPaperDetailVo, paper);

    return vo;
  }

  async update(updateTestPaperDto: UpdateTestPaperDto) {
    try {
      const paper = await this.testPaperRepository.findOne({
        where: {
          id: updateTestPaperDto.id,
        },
        relations: {
          questions: true,
        },
      });

      paper.name = updateTestPaperDto.name;
      paper.desc = updateTestPaperDto.desc;
      paper.radioCount = updateTestPaperDto.radioCount;
      paper.radioRank = updateTestPaperDto.radioRank;
      paper.checkboxCount = updateTestPaperDto.checkboxCount;
      paper.checkboxRank = updateTestPaperDto.checkboxRank;
      paper.determineCount = updateTestPaperDto.determineCount;
      paper.determineRank = updateTestPaperDto.determineRank;
      paper.questions = await this.questionService.findQuestionsInIds(
        updateTestPaperDto.questions,
      );

      await this.testPaperRepository.update(paper, {
        id: updateTestPaperDto.id,
      });
      return '编辑成功';
    } catch (error) {
      throw new HttpException('编辑失败', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    return await this.testPaperRepository.delete({ id });
  }
}
