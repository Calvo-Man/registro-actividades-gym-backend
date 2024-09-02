/* eslint-disable prettier/prettier */
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateActivityDto {

    @IsNotEmpty()
    @IsString() 
    name: string;
    
    @IsNotEmpty()
    @IsNumber()
    reps: number;

    @IsNotEmpty()
    @IsNumber()
    lifted_weight: number;

    @IsNotEmpty()
    @IsDate()
    start_date: Date;

    @IsNotEmpty()
    @IsDate()
    end_date:Date;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    machineId: number;
}
