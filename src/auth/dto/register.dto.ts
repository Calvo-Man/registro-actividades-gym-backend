/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;

  @IsNumber()
  age:number

  @IsNumber()
  weight:number

  @IsNumber()
  height:number

  @IsNumber()
  roleId:number
}
