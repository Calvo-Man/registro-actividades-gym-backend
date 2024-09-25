/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @Transform(({ value }) => value.trim())
  password: string;

  @IsNumber()
  @IsNotEmpty()
  age:number

  @IsNumber()
  @IsNotEmpty()
  weight:number

  @IsNumber()
  @IsNotEmpty()
  height:number

  @IsNumber()
  @IsNotEmpty()
  role:number
}
