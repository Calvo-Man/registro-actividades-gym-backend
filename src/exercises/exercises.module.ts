/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { MachineCategoryModule } from 'src/machine_category/machine_category.module';
import { MachineModule } from 'src/machine/machine.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Exercise]),
    MachineCategoryModule,
    MachineModule
  ],
  controllers: [ExercisesController],
  providers: [ExercisesService],
  exports:[
    ExercisesService
  ]
})
export class ExercisesModule {}
