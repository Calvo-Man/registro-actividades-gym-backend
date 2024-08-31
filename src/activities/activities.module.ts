/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([ActivitiesService])
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports:[ActivitiesService]
})
export class ActivitiesModule {}
