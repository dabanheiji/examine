import { ApiProperty } from '@nestjs/swagger';
import { TypeEnum } from '../../enum';

class QuestionVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  context: string;

  @ApiProperty()
  type: TypeEnum;

  @ApiProperty()
  createTime: Date;

  @ApiProperty()
  updateTime: Date;
}

export class QuestionListVo {
  @ApiProperty({
    type: [QuestionVo],
  })
  list: QuestionVo[];

  @ApiProperty()
  total: number;
}
