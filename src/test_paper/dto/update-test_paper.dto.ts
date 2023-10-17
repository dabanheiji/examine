import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTestPaperDto } from './create-test_paper.dto';

export class UpdateTestPaperDto extends PartialType(CreateTestPaperDto) {
  @ApiProperty()
  id: number;
}
