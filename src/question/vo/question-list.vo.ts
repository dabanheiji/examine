import { ApiProperty } from '@nestjs/swagger';
import { QuestionTypeEnum } from '../../enum';

class QuestionVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  context: string;

  @ApiProperty()
  type: QuestionTypeEnum;

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
