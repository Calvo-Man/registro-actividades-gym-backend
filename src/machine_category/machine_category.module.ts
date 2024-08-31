/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MachineCategoryService } from './machine_category.service';
import { MachineCategoryController } from './machine_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineCategory } from './entities/machine_category.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([MachineCategory])
  ],
  controllers: [MachineCategoryController],
  providers: [MachineCategoryService],
  exports:[MachineCategoryService]
})
export class MachineCategoryModule {}
