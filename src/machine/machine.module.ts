/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Machine
    ])
  ],
  controllers: [MachineController],
  providers: [MachineService],
  exports:[MachineService]
})
export class MachineModule {}
