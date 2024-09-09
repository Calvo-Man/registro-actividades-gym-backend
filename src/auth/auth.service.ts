/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
  private readonly jwtService: JwtService
  ) {}
  async register(registerDto: RegisterDto) {

    const rol:any= registerDto.role;

    const user = await this.usersService.findOneByEmail(registerDto.email);

    if (user) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await bcryptjs.hash(registerDto.password, 10);

    await this.usersService.create({
     ...registerDto,
      password: hashedPassword,
      role:rol
    })

    return {
      message: 'User created successfully',
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { email: user.email };

    const token = await this.jwtService.signAsync(payload);
    return {
      token: token,
      email: user.email,
      id:user.id,
      rol:user.role
    };
  }
}
