import { ApiProperty } from '@nestjs/swagger';

export class CreateTestPaperDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  desc?: string;

  @ApiProperty()
  radioCount: number;

  @ApiProperty()
  radioRank: number;

  @ApiProperty()
  checkboxCount: number;

  @ApiProperty()
  checkboxRank: number;

  @ApiProperty()
  determineCount: number;

  @ApiProperty()
  determineRank: number;

  @ApiProperty({
    type: [Number],
  })
  questions: number[];
}
