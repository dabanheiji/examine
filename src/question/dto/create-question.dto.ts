import { ApiProperty } from '@nestjs/swagger';
import { TypeEnum } from '../enum';

export class AnswerDto {
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
  image?: string;

  @ApiProperty()
  answers: AnswerDto[];
}
