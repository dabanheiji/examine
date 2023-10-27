import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @ApiBody({
    type: CreateDeptDto,
  })
  @ApiResponse({
    type: String,
  })
  @Post('create')
  async create(@Body() createDeptDto: CreateDeptDto) {
    return await this.deptService.create(createDeptDto);
  }

  @ApiResponse({
    type: String,
  })
  @Get('tree')
  async findAll() {
    return await this.deptService.findAll();
  }

  @ApiResponse({
    type: String,
  })
  @Patch('update')
  async update(@Body() updateDeptDto: UpdateDeptDto) {
    return await this.deptService.update(updateDeptDto);
  }

  @ApiResponse({
    type: String,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deptService.remove(+id);
  }
}
