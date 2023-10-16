import { ApiProperty } from '@nestjs/swagger';

export class CreateTestPaperDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  radioRank: number;

  @ApiProperty()
  checkboxRank: number;

  @ApiProperty()
  determineRank: number;

  @ApiProperty({
    type: [Number],
  })
  questions: number[];
}
