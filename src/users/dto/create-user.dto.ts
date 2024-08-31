/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNumber()
    age:number

    @IsNumber()
    weight:number

    @IsNumber()
    height:number

    @IsNumber()
    roleId:number
}
