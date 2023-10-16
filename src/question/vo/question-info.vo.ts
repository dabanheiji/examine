import { ApiProperty, PartialType } from '@nestjs/swagger';

class AnswerVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  context: string;

  @ApiProperty()
  isRight: boolean;
}

export class QuestionInfoVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  context: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  catrgoeys: number[];

  @ApiProperty({
    type: [AnswerVo],
  })
  answers: AnswerVo[];
}
