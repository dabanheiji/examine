import { ApiProperty } from '@nestjs/swagger';

export class LoginUserVo {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
