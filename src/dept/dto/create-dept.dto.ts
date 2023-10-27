import { ApiProperty } from '@nestjs/swagger';

export class CreateDeptDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  parentId?: number;
}
