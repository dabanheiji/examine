import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsNotEmpty({
    message: '必须输入用户名',
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: '必须输入新密码',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty({
    message: '必须输入验证码',
  })
  verifyCode: string;
}
