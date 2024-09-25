/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants/jwt.constant";


import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';



@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    }),
    MailerModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('HOST_EMAIL'),
          port: 587,
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_REMITENTE'),
            pass: configService.get<string>('PASSWORD_EMAIL_REMITENTE'),
          },
          
        },
        defaults: {
          from: `'Biblioteca SENA' ${configService.get<string>('EMAIL_REMITENTE')}`,
        },
        template: {
          dir: './templates/',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },     
      }),inject:[ConfigService]
    })
    ],
  controllers: [AuthController],
  providers: [AuthService,ConfigService],
})
export class AuthModule {}
