import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
      throw new HttpException('token 已到期', HttpStatus.BAD_REQUEST);
    }
  }
}
