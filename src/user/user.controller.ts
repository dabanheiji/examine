import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserInfoVo } from './vo/user-info.vo';

@ApiTags('用户管理模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '注册成功/失败',
    type: String,
  })
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.register(registerUserDto);
  }

  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'token 信息',
    type: LoginUserVo,
  })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.login(loginUserDto);
    const vo = new LoginUserVo();

    vo.accessToken = this.jwtService.sign(
      {
        userId: user.id,
        username: user.username,
        name: user.name,
      },
      { expiresIn: this.configService.get('jwt_access_token_expires_time') },
    );

    vo.refreshToken = this.jwtService.sign(
      {
        userId: user.id,
      },
      { expiresIn: this.configService.get('jwt_refresh_token_expires_time') },
    );

    return vo;
  }

  @ApiQuery({
    name: 'refreshToken',
    type: String,
    description: '刷新 token',
    required: true,
    example: 'token string',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'token 信息',
    type: LoginUserVo,
  })
  @Get('refresh')
  async refresh(@Query('refreshToken') refreshToken: string) {
    try {
      const data = await this.jwtService.verify(refreshToken);
      const user = await this.userService.findOneUserById(data.id);

      const vo = new LoginUserVo();

      vo.accessToken = this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
          name: user.name,
        },
        { expiresIn: this.configService.get('jwt_access_token_expires_time') },
      );

      vo.refreshToken = this.jwtService.sign(
        {
          userId: user.id,
        },
        { expiresIn: this.configService.get('jwt_refresh_token_expires_time') },
      );

      return vo;
    } catch (error) {
      throw new UnauthorizedException('token 已失效');
    }
  }

  @ApiBody({
    type: UpdatePasswordDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '修改成功/失败',
    type: String,
  })
  @Post('update-password')
  async updatePassword(updatePassword: UpdatePasswordDto) {
    return await this.userService.updatePassword(updatePassword);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: UserInfoVo,
    description: '用户信息',
  })
  @Get('info')
  async info() {
    const vo = new UserInfoVo();
    return vo;
  }
}
