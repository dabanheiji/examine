import { Test, TestingModule } from '@nestjs/testing';
import { TestPlanService } from './test_plan.service';

describe('TestPlanService', () => {
  let service: TestPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestPlanService],
    }).compile();

    service = module.get<TestPlanService>(TestPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
