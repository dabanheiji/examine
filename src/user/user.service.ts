import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { LoginUserDto } from './dto/login-user.dto';
import { md5 } from 'src/utils';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async register(registerUserDto: RegisterUserDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: registerUserDto.username,
    });

    if (foundUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const user = plainToClass(User, registerUserDto);
    user.password = md5(registerUserDto.password);

    try {
      await this.userRepository.save(user);
      return '注册成功';
    } catch (error) {
      throw new HttpException('注册失败', HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: loginUserDto.username,
    });

    if (!foundUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    if (foundUser.password !== md5(loginUserDto.password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    return foundUser;
  }

  async findOneUserById(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    return user;
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOneBy({
      username: updatePasswordDto.username,
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    user.password = updatePasswordDto.password;

    try {
      await this.userRepository.update(user, {
        username: updatePasswordDto.username,
      });
      return '修改成功';
    } catch (error) {
      return '修改失败';
    }
  }
}
