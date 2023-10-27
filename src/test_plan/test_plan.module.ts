import { Module } from '@nestjs/common';
import { TestPlanService } from './test_plan.service';
import { TestPlanController } from './test_plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestPlan } from './entities/test_plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestPlan])],
  controllers: [TestPlanController],
  providers: [TestPlanService],
})
export class TestPlanModule {}
