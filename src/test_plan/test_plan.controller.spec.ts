import { Test, TestingModule } from '@nestjs/testing';
import { TestPlanController } from './test_plan.controller';
import { TestPlanService } from './test_plan.service';

describe('TestPlanController', () => {
  let controller: TestPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestPlanController],
      providers: [TestPlanService],
    }).compile();

    controller = module.get<TestPlanController>(TestPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
