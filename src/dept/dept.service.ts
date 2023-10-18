import { Injectable } from '@nestjs/common';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';

@Injectable()
export class DeptService {
  async create(createDeptDto: CreateDeptDto) {
    return 'This action adds a new dept';
  }

  async findAll() {
    return `This action returns all dept`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} dept`;
  }

  async update(id: number, updateDeptDto: UpdateDeptDto) {
    return `This action updates a #${id} dept`;
  }

  async remove(id: number) {
    return `This action removes a #${id} dept`;
  }
}
