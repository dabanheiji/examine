import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: '姓名不能为空',
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
