/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
//import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository (User) private userRepository:Repository<User>,
    private rolesService:RolesService,
  ){}
  async create(createUserDto: CreateUserDto) {
    const role = await this.rolesService.findOne(createUserDto.roleId)
    if(!role){
      throw new NotFoundException( `Rol with ID ${createUserDto.roleId} not found `)
    }

    const user =  this.userRepository.create({
      ...createUserDto,
      role,
    })

    return await this.userRepository.save(user)
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
