/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import {IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
    @Type(() => Date)
    @IsDate()
    start_date: Date;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    end_date:Date;

    
    @IsNumber()
    Duration:number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    machineId: number;

    @IsNotEmpty()
    @IsNumber()
    exerciseId: number;
}
