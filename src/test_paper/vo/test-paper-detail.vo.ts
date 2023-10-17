import { ApiProperty } from '@nestjs/swagger';
import { QuestionInfoVo } from 'src/question/vo/question-info.vo';

export class TestPaperDetailVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  desc: string;

  @ApiProperty()
  type: string;

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

  @ApiProperty()
  createBy: string;

  @ApiProperty()
  updateBy: string;

  @ApiProperty()
  createTime: Date;

  @ApiProperty()
  updateTime: Date;

  @ApiProperty()
  questions: QuestionInfoVo[];
}
