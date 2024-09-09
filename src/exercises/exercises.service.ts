/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { Repository } from 'typeorm';
//import { MachineService } from 'src/machine/machine.service';
import { MachineCategoryService } from 'src/machine_category/machine_category.service';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository (Exercise) private exerciseRepository:Repository<Exercise>,
    private machineCategoryService:MachineCategoryService
  ){}
  async create(createExerciseDto: CreateExerciseDto) {
    
    const machine_category:any= createExerciseDto.machineCategory;
    const machineCategory = await this.machineCategoryService.findOne(machine_category)

    if(!machineCategory){
      throw new NotFoundException(`Category with ID ${createExerciseDto.machineCategory} not found`)
    }
    const exercise =  this.exerciseRepository.create({...CreateExerciseDto,machineCategory})

    return await this.exerciseRepository.save(exercise)
  }

  async findAll() {
   return await this.exerciseRepository.find({relations:['machineCategory']})
    
  }

  async findOne(id: number) {
    const findExercise = await this.exerciseRepository.findOne({
      where:{id},
      relations:['machineCategory']
    })
    if(!findExercise){
      throw new NotFoundException(`Exercise with ID ${id} not found`)
    }

    return findExercise;
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    const machine_category:any= updateExerciseDto.machineCategory;
    const machineCategory = await this.machineCategoryService.findOne(machine_category)

    if(!machineCategory){
      throw new NotFoundException(`Category with ID ${updateExerciseDto.machineCategory} not found`)
    }
    const exercise = await this.exerciseRepository.preload({
      id,...updateExerciseDto,machineCategory
    })
    return this.exerciseRepository.save(exercise)
  }

  async remove(id: number) {
    const findExercise = await this.exerciseRepository.findOne({
      where:{id}
    })
    if(!findExercise){
      throw new NotFoundException(`Exercise with ID ${id} not found`)
    }

    return await this.exerciseRepository.delete(id)
  }
}
