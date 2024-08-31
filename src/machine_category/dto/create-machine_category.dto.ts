/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMachineCategoryDto {

    @IsNotEmpty()
    @IsString()
    category:string

}
