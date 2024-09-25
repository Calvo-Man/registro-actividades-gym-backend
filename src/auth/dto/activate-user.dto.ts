/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsUUID } from "class-validator";

export class ActivationUser{

    @IsNotEmpty()
    @IsUUID('4')
    id:string

    @IsNotEmpty()
    @IsUUID('4')
    activationToken:string
}