import { Injectable } from '@nestjs/common';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { Repository } from 'typeorm';
import { Dept } from './entities/dept.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeptService {
  @InjectRepository(Dept)
  private deptRepository: Repository<Dept>;

  async create(createDeptDto: CreateDeptDto) {
    const dept = new Dept();
    dept.name = createDeptDto.name;
    return await this.deptRepository.save(dept);
  }

  async findAll() {
    return await this.deptRepository.find({
      relations: {
        children: true,
      },
    });
  }

  async update(updateDeptDto: UpdateDeptDto) {
    return await this.deptRepository.update(updateDeptDto.id, updateDeptDto);
  }

  async remove(id: number) {
    return await this.deptRepository.delete(id);
  }
}
