/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { Repository } from 'typeorm';
import { MachineCategoryService } from 'src/machine_category/machine_category.service';

@Injectable()
export class MachineService {

  constructor(
    @InjectRepository (Machine) private machineRepository:Repository<Machine>,
    private machineCategoryService:MachineCategoryService
  ){}
  async create(createMachineDto: CreateMachineDto) {
    const machineCategory = await this.machineCategoryService.findOne(createMachineDto.machineCategoryId);
    if(!machineCategory){
      throw new NotFoundException(`Machine category with ${createMachineDto.machineCategoryId} not found`)
    }

    const machine =  this.machineRepository.create({
      ...createMachineDto,
      machineCategory
    })

    return await this.machineRepository.save(machine)
  }

  async findAll() {
    return  await this.machineRepository.find({relations:['machineCategory']})
    
  }

  async findOne(id: number) {
    const machine = await this.machineRepository.findOne({where:{id},relations:['machineCategory']})
    if(!machine){
      throw new NotFoundException(`Machine with ${id} not found`)
    }
    return machine

    
  }

  async update(id: number, updateMachineDto: UpdateMachineDto) {
    const machineCategory = await this.machineCategoryService.findOne(updateMachineDto.machineCategoryId)
    if(!machineCategory){
      throw new NotFoundException(`Machine category with ${updateMachineDto.machineCategoryId} not found`)
    }
    const machine = await this.machineRepository.preload({id,...updateMachineDto,machineCategory})
    if(!machine){
      throw new NotFoundException(`Machine with ${id} not found`)
    }

    return await this.machineRepository.save(machine)
  
  }

 async remove(id: number) {
    const machine = await this.machineRepository.findOne({where:{id}})
    if(!machine){
      throw new NotFoundException(`Machine with ${id} not found`)
    }
    return await this.machineRepository.delete(id)
    
  }
}
