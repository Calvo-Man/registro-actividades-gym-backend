/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import {
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { MachineService } from 'src/machine/machine.service';
import { UsersService } from 'src/users/users.service';
import { ExercisesService } from 'src/exercises/exercises.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    private machineService: MachineService,
    private userService: UsersService,
    private exerciseService: ExercisesService,
  ) {}

  @UseGuards(AuthGuard)
  async create(createActivityDto: CreateActivityDto) {
    const machine = await this.machineService.findOne(
      createActivityDto.machineId,
    );
    if (!machine) {
      throw new NotFoundException(
        `Machine with ID ${createActivityDto.machineId} not found`,
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

    const startDate = new Date(createActivityDto.start_date);
    const endDate = new Date(createActivityDto.end_date);
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffHours = diffTime / (1000 * 60);

    // console.log('Time Difference:', diffTime / (1000 * 60), ' minutes');

    const findDisponibilty = await this.activityRepository.findOne({
      where: {
        machine: machine,
        start_date: LessThanOrEqual(endDate),
        end_date: MoreThanOrEqual(startDate),
      },
    });

    if (findDisponibilty) {
      throw new ConflictException(
        `You cannot create an activity with this machine ID: ${createActivityDto.machineId}-${machine.name} because it was being used at this date`,
      );
    }
    if(createActivityDto.start_date >= createActivityDto.end_date){
      throw new ConflictException(`The start date cannot be greater than the end date`)  
    }
    const activity = this.activityRepository.create({
      ...createActivityDto,
      machine,
      exercise,
      user,
      duration: diffHours, // Set the duration here instead of modifying the DTO
    });

    return this.activityRepository.save(activity);
  }

  async findAll() {
    return this.activityRepository.find();
  }
  async findTopThreeUsersByWeightLifted() {
  return this.activityRepository
    .createQueryBuilder('activity')
    .select('activity.user.id', 'userId')
    .addSelect('SUM(activity.lifted_weight)', 'totalWeight')
    .innerJoin('activity.user', 'user') // Add this line to join the user entity
    .addSelect('user.name', 'userName')
    .groupBy('activity.user.id')
    .orderBy('totalWeight', 'DESC')
    .limit(3) // Change this to 5 instead of 3
    .getRawMany();
}
  async findAllByUser(id: number) {
    return this.activityRepository.find({
      where: {
        user: {id:id},

      },
      order:{
        start_date:'DESC'
      },
      relations: ['machine','exercise'],

    })
  }
  async findAllByDay(id:number){
    
    const currentlyDay = new Date();
    currentlyDay.setDate(currentlyDay.getDate())
    console.log(currentlyDay)
    const endOfCurrentlyDay = new Date();
    endOfCurrentlyDay.setDate(endOfCurrentlyDay.getDate() +1);
    
    return this.activityRepository.find({
      where: {
        user:{id:id},
        start_date: MoreThanOrEqual(currentlyDay),
        end_date:LessThanOrEqual(endOfCurrentlyDay)
      },
      relations:['machine']
    });
  }
  async findAllByWeek(id:number){
    const currentlyWeek = new Date();
    currentlyWeek.setDate(currentlyWeek.getDate()-7)
    const endOfCurrentlyWeek = new Date();
    endOfCurrentlyWeek.setDate(endOfCurrentlyWeek.getDate() +1);
    
    return this.activityRepository.find({
      where: {
        user:{id:id},
        start_date: MoreThanOrEqual(currentlyWeek),
        end_date:LessThanOrEqual(endOfCurrentlyWeek)
      },
      relations:['machine']
    });
  }
  async findByWeekPerMachine(id:number,idMachine:number){
    const currentlyWeek = new Date();
    currentlyWeek.setDate(currentlyWeek.getDate()-7)
    const endOfCurrentlyWeek = new Date();
    endOfCurrentlyWeek.setDate(endOfCurrentlyWeek.getDate() +1);
    
    return this.activityRepository.find({
      where: {
        user:{id:id},
        machine:{id:idMachine},
        start_date: MoreThanOrEqual(currentlyWeek),
        end_date:LessThanOrEqual(endOfCurrentlyWeek)
      },
      relations:['machine']
    });
  }
  async getActivitiesGroupedByWeek() {
    return await this.activityRepository
      .createQueryBuilder('activity')
      .select('WEEK(activity.start_date)', 'week_number')
      .addSelect('YEAR(activity.start_date)', 'year')
      .addSelect('SUM(activity.reps)', 'reps')
      .addSelect('SUM(activity.duration)', 'duration')
      .groupBy('YEAR(activity.start_date)')
      .addGroupBy('WEEK(activity.start_date)')
      .orderBy('YEAR(activity.start_date)', 'ASC')
      .addOrderBy('WEEK(activity.start_date)', 'ASC')
      .getRawMany();
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
  async orderByLastWeek() {
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);
    console.log('Now:', now);
    console.log('One Week Ago:', oneWeekAgo);
    return await this.activityRepository.find({
      where: {
        start_date: Between(oneWeekAgo, now),
        end_date: Between(oneWeekAgo, now),
      },
    });
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
