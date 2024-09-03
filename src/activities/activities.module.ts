/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { MachineModule } from 'src/machine/machine.module';
import { UsersModule } from 'src/users/users.module';
import { ExercisesModule } from 'src/exercises/exercises.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Activity]),
    MachineModule,
    UsersModule,
    ExercisesModule
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports:[ActivitiesService]
})
export class ActivitiesModule {}
