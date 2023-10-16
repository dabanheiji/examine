import { ApiProperty } from '@nestjs/swagger';
import { TypeEnum } from '../../enum';

export class AnswerDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  context: string;

  @ApiProperty()
  isRight: boolean;
}

export class CreateQuestionDto {
  @ApiProperty()
  context: string;

  @ApiProperty()
  type: TypeEnum;

  @ApiProperty()
  categorys: number[];

  @ApiProperty()
  image?: string;

  @ApiProperty({
    type: [AnswerDto],
  })
  answers: AnswerDto[];
}
