import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestPlanService } from './test_plan.service';
import { CreateTestPlanDto } from './dto/create-test_plan.dto';
import { UpdateTestPlanDto } from './dto/update-test_plan.dto';

@Controller('test-plan')
export class TestPlanController {
  constructor(private readonly testPlanService: TestPlanService) {}

  @Post()
  create(@Body() createTestPlanDto: CreateTestPlanDto) {
    return this.testPlanService.create(createTestPlanDto);
  }

  @Get()
  findAll() {
    return this.testPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testPlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestPlanDto: UpdateTestPlanDto) {
    return this.testPlanService.update(+id, updateTestPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testPlanService.remove(+id);
  }
}
