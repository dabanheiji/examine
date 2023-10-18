import { Module } from '@nestjs/common';
import { TestPlanService } from './test_plan.service';
import { TestPlanController } from './test_plan.controller';

@Module({
  controllers: [TestPlanController],
  providers: [TestPlanService],
})
export class TestPlanModule {}
