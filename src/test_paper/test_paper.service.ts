import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { CreateTestPaperDto } from './dto/create-test_paper.dto';
import { UpdateTestPaperDto } from './dto/update-test_paper.dto';
import { Like, Repository } from 'typeorm';
import { TestPaper } from './entities/test_paper.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionService } from '../question/question.service';
import { TestPaperVo } from './vo/test-paper.vo';

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
      paper.radioRank = createTestPaperDto.radioRank;
      paper.checkboxRank = createTestPaperDto.checkboxRank;
      paper.determineRank = createTestPaperDto.determineRank;
      const testPaper = await this.testPaperRepository.save(paper);
      await this.questionService.addQuestionOnPaper(
        testPaper,
        createTestPaperDto.questions,
      );
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
    return `This action returns a #${id} testPaper`;
  }

  async update(id: number, updateTestPaperDto: UpdateTestPaperDto) {
    return `This action updates a #${id} testPaper`;
  }

  async remove(id: number) {
    return `This action removes a #${id} testPaper`;
  }
}
