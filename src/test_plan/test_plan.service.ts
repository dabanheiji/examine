import { Injectable } from '@nestjs/common';
import { CreateTestPlanDto } from './dto/create-test_plan.dto';
import { UpdateTestPlanDto } from './dto/update-test_plan.dto';

@Injectable()
export class TestPlanService {
  create(createTestPlanDto: CreateTestPlanDto) {
    return 'This action adds a new testPlan';
  }

  findAll() {
    return `This action returns all testPlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testPlan`;
  }

  update(id: number, updateTestPlanDto: UpdateTestPlanDto) {
    return `This action updates a #${id} testPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} testPlan`;
  }
}
