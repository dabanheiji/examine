import { PartialType } from '@nestjs/swagger';
import { CreateQuestionDto, AnswerDto } from './create-question.dto';

// class AnswerDto

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  id: number;
}
