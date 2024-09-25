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
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
  private readonly jwtService: JwtService,
  private readonly mailerService:MailerService,
  private readonly configService:ConfigService
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

    const payload = { email: registerDto.email};

    const token = await this.jwtService.signAsync(payload);

    return await this.mailerService.sendMail({
      to: registerDto.email,
      subject: "Recuperación de contraseña",
      template: 'confirm',
      context: {
        nombres: `${registerDto.name}`,
        endpointBackend:this.configService.get<string>('ENDPOINT_BACKEND'),
        fondoPlantilla:`${this.configService.get<string>('ENDPOINT_BACKEND')}/public/img/fondo.png`,
        linkRecuperacion: `${this.configService.get<string>('ENDPOINT_FRONTEND')}${registerDto.name}/${token}`,
      }
    }).then((send) => {
      return send.accepted.length > 0 ? {
        success: true,
        message: "Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña",
      } : {
        success: false,
        message: "No se ha podido enviar el correo electrónico",
      };
    }).catch(error => {
      return {
        success: false,
        message: "Sucedió un error enviando el correo",
        ex: error
      }
    })
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
    const payload = { email: user.email,role:user.role,id:user.id };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      email: user.email,
      id:user.id,
      role:user.role.rol_name
    };
  }
}
