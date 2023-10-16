import { ApiProperty } from '@nestjs/swagger';

class TestPaperRecordVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  radioRank: number;

  @ApiProperty()
  checkboxRank: number;

  @ApiProperty()
  determineRank: number;

  @ApiProperty()
  createBy: string;

  @ApiProperty()
  createTime: Date;

  @ApiProperty()
  updateBy: string;

  @ApiProperty()
  updateTime: Date;
}

export class TestPaperVo {
  @ApiProperty({
    type: [TestPaperRecordVo],
  })
  list: TestPaperRecordVo[];

  @ApiProperty()
  total: number;
}
