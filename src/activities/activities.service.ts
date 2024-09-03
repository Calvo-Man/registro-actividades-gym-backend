/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';
import { MachineService } from 'src/machine/machine.service';
import { UsersService } from 'src/users/users.service';
import { ExercisesService } from 'src/exercises/exercises.service';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    private machineService: MachineService,
    private userService: UsersService,
    private exerciseService: ExercisesService,
  ) {}
  async create(createActivityDto: CreateActivityDto) {
    const machine = await this.machineService.findOne(
      createActivityDto.machineId,
    );
    if (!machine) {
      throw new NotFoundException(
        `Machine with ${createActivityDto.machineId} not found`,
      );
    }

    const exercise = await this.exerciseService.findOne(
      createActivityDto.exerciseId,
    );
    if (!exercise) {
      throw new NotFoundException(
        `Exercise with ID ${createActivityDto.exerciseId} not found`,
      );
    }

    const user = await this.userService.findOne(createActivityDto.userId);
    if (!user) {
      throw new NotFoundException(`This user does not exist`);
    }

    const activity = this.activityRepository.create({
      ...createActivityDto,
      machine,
      exercise,
      user,
    });

    return this.activityRepository.save(activity);
  }

  async findAll() {
    return await this.activityRepository.find({
      relations: ['machine', 'exercise', 'user'],
    });
  }

  async findOne(id: number) {
    const activity = await this.activityRepository.findOne({
      where: { id },
      relations: ['machine', 'exercise', 'user'],
    });
    if (!activity) {
      throw new NotFoundException(`Activity with ${id} not found`);
    }
    return activity;
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    const machine = await this.machineService.findOne(
      updateActivityDto.machineId,
    );
    if (!machine) {
      throw new NotFoundException(
        `Machine with ${updateActivityDto.machineId} not found`,
      );
    }

    const exercise = await this.exerciseService.findOne(
      updateActivityDto.exerciseId,
    );
    if (!exercise) {
      throw new NotFoundException(
        `Exercise with ID ${updateActivityDto.exerciseId} not found`,
      );
    }

    const user = await this.userService.findOne(updateActivityDto.userId);
    if (!user) {
      throw new NotFoundException(`This user not exist`);
    }

    const activity = await this.activityRepository.preload({
      id,
      ...updateActivityDto,
      machine,
      exercise,
      user,
    });

    if (!activity) {
      throw new NotFoundException(`Activity with ${id} not found`);
    }

    return this.activityRepository.save(activity);
  }

  async remove(id: number) {
    const activity = await this.activityRepository.findOne({ where: { id } });
    if (!activity) {
      throw new NotFoundException(`Activity with ${id} not found`);
    }
    return await this.activityRepository.delete(id);
  }
}
