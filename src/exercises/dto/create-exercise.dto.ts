/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";
import { MachineCategory } from "src/machine_category/entities/machine_category.entity";

export class CreateExerciseDto {
    @IsNotEmpty()
    @IsString()
    name:string


    @IsNotEmpty()
    @IsString()
    machineCategory:MachineCategory

}
