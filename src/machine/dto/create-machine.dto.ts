/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateMachineDto {
    
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsNumber()
    max_weight:number

    @IsNotEmpty()
    @IsNumber()
    machineCategoryId:number
}
