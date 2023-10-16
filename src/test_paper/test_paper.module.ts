import { Module } from '@nestjs/common';
import { TestPaperService } from './test_paper.service';
import { TestPaperController } from './test_paper.controller';
import { TestPaper } from './entities/test_paper.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([TestPaper]), QuestionModule],
  controllers: [TestPaperController],
  providers: [TestPaperService],
})
export class TestPaperModule {}
