/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ){}

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleRepository.save(createRoleDto)
  }

  async findAll() {
    return  await this.roleRepository.find({relations:['users']});
  }

  async findOne(id: number) {
    return await this.roleRepository.findOne({
      where:{id},
      relations:['users'],
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return await this.roleRepository.update({id},updateRoleDto);
  }

  async remove(id: number) {
    return await this.roleRepository.delete(id);
  }
}
