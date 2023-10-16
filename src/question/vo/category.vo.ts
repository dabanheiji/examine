import { ApiProperty } from '@nestjs/swagger';

export class CategoryVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({
    type: [CategoryVo],
  })
  children: CategoryVo[];
}
