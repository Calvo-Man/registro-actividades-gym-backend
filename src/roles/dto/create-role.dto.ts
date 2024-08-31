/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {

    @IsNotEmpty()
    @IsString()
    rol_name:string
}
