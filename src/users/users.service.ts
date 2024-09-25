/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository (User) private userRepository:Repository<User>,
    private rolesService:RolesService,
  ){}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    const findUsers = await this.userRepository.find(
      {relations:['role']}
    )

    if(findUsers.length === 0){
      throw new NotFoundException('Not users found')
    }

    return findUsers;
  }

   async findOne(id: number) {
    const findUser = await this.userRepository.findOne(
      {where:{id},relations:['role']}
    )

    if(!findUser){
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    return findUser;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne(
      {where:{email},relations:['role']}
    );
  }
  async findActivities(email:string){
    const user = await this.findOneByEmail(email);
    if(!user){
      throw new NotFoundException(`User with email ${email} not found`)
    }
    return user.activities
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const rol:any= updateUserDto.role;
    const role = await this.rolesService.findOne(rol);
    if(!role){
      throw new NotFoundException(`Rol with ID ${id} not found`)
    };

    const user = await this.userRepository.preload(
      {
        id,
        ...updateUserDto,
        role
      }
    );

    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const findUser = await this.findOne(id);

    if(!findUser){
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return await this.userRepository.delete(id)
  }
}
