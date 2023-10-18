import { PartialType } from '@nestjs/swagger';
import { CreateTestPlanDto } from './create-test_plan.dto';

export class UpdateTestPlanDto extends PartialType(CreateTestPlanDto) {}
