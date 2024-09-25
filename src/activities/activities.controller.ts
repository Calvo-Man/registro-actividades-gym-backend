/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @Get()
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get('ranking/lifted-weight')
  async findTopFiveUsersByWeightLifted() {
    return await this.activitiesService.findTopThreeUsersByWeightLifted();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(+id);
  }
  @Get('user/:id/all')
  async findAllByUser(@Param('id') id:string){
    return await this.activitiesService.findAllByUser(+id);
  }
  @Get('user/:id')
  findAllByWeek(@Param('id') id: string) {
    return this.activitiesService.findAllByWeek(+id);
  }
  
  @Get('user/:id/today')
  findAllByDay(@Param('id') id: string) {
    return this.activitiesService.findAllByDay(+id);
  }

  @Get('user/:id/machine/:idMachine')
  findByWeekPerMachine(
    @Param('id') id: string,
    @Param('idMachine') idMachine: string,
  ) {
    return this.activitiesService.findByWeekPerMachine(+id, +idMachine);
  }

  
  @Get('user/:id/weekly')
  getActivitiesGroupedByWeek() {
    return this.activitiesService.getActivitiesGroupedByWeek();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activitiesService.update(+id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(+id);
  }
}
