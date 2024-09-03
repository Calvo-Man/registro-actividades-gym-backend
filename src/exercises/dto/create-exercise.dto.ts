/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateExerciseDto {
    @IsNotEmpty()
    @IsString()
    name:string


    @IsNotEmpty()
    @IsString()
    machineCategoryId:number

}
