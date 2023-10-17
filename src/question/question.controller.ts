import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuestionTypeEnum } from '../enum';
import { Type } from 'class-transformer';
import { QuestionListVo } from './vo/question-list.vo';
import { QuestionInfoVo } from './vo/question-info.vo';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryVo } from './vo/category.vo';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('题库管理模块')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({ summary: '创建题目' })
  @ApiBody({
    type: CreateQuestionDto,
    description: '创建题目',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
    description: '添加成功',
  })
  @Post('create')
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionService.create(createQuestionDto);
  }

  @ApiOperation({ summary: '获取题目列表' })
  @ApiQuery({
    name: 'pageNo',
    description: '第几页',
    type: Number,
    required: true,
  })
  @ApiQuery({
    name: 'pageSize',
    description: '每页几条',
    type: Number,
    required: true,
  })
  @ApiQuery({
    name: 'context',
    description: '题目（模糊匹配）',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'type',
    description: '题目类型',
    enum: QuestionTypeEnum,
    required: false,
  })
  @ApiQuery({
    name: 'category',
    description: '题目分类',
    type: String,
    required: false,
  })
  @ApiResponse({
    type: QuestionListVo,
    description: '列表数据',
  })
  @Get('list')
  async findAll(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
    @Query('context') context: string,
    @Query('type') type: QuestionTypeEnum,
    @Query('category') category: string,
  ) {
    return await this.questionService.findAll(
      pageNo,
      pageSize,
      context,
      type,
      category,
    );
  }

  @ApiOperation({ summary: '获取题目详情' })
  @ApiQuery({
    name: 'id',
    description: '题目id',
    type: String,
    required: true,
  })
  @ApiResponse({
    type: QuestionInfoVo,
    description: '题目详情',
  })
  @Get('detail')
  async findOne(@Query('id') id: string) {
    return await this.questionService.findOne(+id);
  }

  @ApiOperation({ summary: '编辑题目' })
  @ApiBody({
    type: UpdateQuestionDto,
    description: '编辑题目',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '编辑成功/失败',
    type: String,
  })
  @Post('update')
  async update(@Body() updateQuestionDto: UpdateQuestionDto) {
    return await this.questionService.update(updateQuestionDto);
  }

  @ApiOperation({ summary: '删除题目' })
  @ApiParam({
    name: 'id',
    type: String,
    description: '题目id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '删除成功/失败',
    type: String,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.questionService.remove(+id);
  }

  @ApiOperation({ summary: '添加题目分类' })
  @ApiBody({
    type: CreateCategoryDto,
    description: '添加题目',
  })
  @ApiResponse({
    type: String,
    status: HttpStatus.OK,
    description: '添加成功/失败',
  })
  @Post('category/create')
  async categoryCreate(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.questionService.categoryCreate(createCategoryDto);
  }

  @ApiOperation({ summary: '获取分类树' })
  @ApiResponse({
    type: [CategoryVo],
  })
  @Get('category/tree')
  async categoryFindAll() {
    return await this.questionService.categoryFindAll();
  }

  @ApiOperation({ summary: '更新分类树' })
  @ApiResponse({
    type: String,
    status: HttpStatus.OK,
    description: '更新成功/失败',
  })
  @Post('category/update')
  async categoryUpdate(@Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.questionService.categoryUpdate(updateCategoryDto);
  }

  @ApiOperation({ summary: '删除分类' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '分类id',
  })
  @ApiResponse({
    type: String,
    status: HttpStatus.OK,
    description: '删除成功/失败',
  })
  @Delete('category/:id')
  async categoryRemove(@Param('id') id: string) {
    return await this.questionService.categoryRemove(+id);
  }
}
