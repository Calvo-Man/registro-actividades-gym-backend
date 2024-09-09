/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMachineCategoryDto } from './dto/create-machine_category.dto';
import { UpdateMachineCategoryDto } from './dto/update-machine_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MachineCategory } from './entities/machine_category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MachineCategoryService {
  constructor(
    @InjectRepository (MachineCategory) 
    private machineCategoryRepository:Repository<MachineCategory>
  ){}
  async create(createMachineCategoryDto: CreateMachineCategoryDto) {

    return await this.machineCategoryRepository.save(createMachineCategoryDto)
  }

   async findAll() {
    return await this.machineCategoryRepository.find(
      {relations:['machine']}
    );
  }

  async findOne(id: number) {
    const category = await this.machineCategoryRepository.findOne({where:{id},relations:['machine']})
    if(!category){
      throw new NotFoundException(`Machine category with ${id} not found`)
    }
    return category;
  }

  async findOneByCategory(category:string){
    console.log(category)
    return await this.machineCategoryRepository.findOne({where:{category},relations:['machine']})
  }

  async update(id: number, updateMachineCategoryDto: UpdateMachineCategoryDto) {
    const category = await this.findOne(id)

    if(!category){
      throw new NotFoundException(`Machine category with ${id} not found`)
    }

    return await this.machineCategoryRepository.update({id},updateMachineCategoryDto)
  }

  async remove(id: number) {
    const category = await this.findOne(id)

    if(!category){
      throw new NotFoundException(`Machine category with ${id} not found`)
    }

    return await this.machineCategoryRepository.delete(id)
  }
}
