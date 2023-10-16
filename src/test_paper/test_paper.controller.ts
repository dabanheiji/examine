import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TestPaperService } from './test_paper.service';
import { CreateTestPaperDto } from './dto/create-test_paper.dto';
import { UpdateTestPaperDto } from './dto/update-test_paper.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TestPaperVo } from './vo/test-paper.vo';

@ApiTags('试卷模块')
@Controller('test-paper')
export class TestPaperController {
  constructor(private readonly testPaperService: TestPaperService) {}

  @Post('create')
  async create(@Body() createTestPaperDto: CreateTestPaperDto) {
    return await this.testPaperService.create(createTestPaperDto);
  }

  @ApiResponse({
    type: TestPaperVo,
  })
  @Get('list')
  async findAll(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
    @Query('name') name: string,
  ) {
    return await this.testPaperService.findAll(pageNo, pageSize, name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testPaperService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestPaperDto: UpdateTestPaperDto,
  ) {
    return this.testPaperService.update(+id, updateTestPaperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testPaperService.remove(+id);
  }
}
