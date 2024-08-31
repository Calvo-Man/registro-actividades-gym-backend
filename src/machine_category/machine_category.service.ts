import { Injectable } from '@nestjs/common';
import { CreateMachineCategoryDto } from './dto/create-machine_category.dto';
import { UpdateMachineCategoryDto } from './dto/update-machine_category.dto';

@Injectable()
export class MachineCategoryService {
  create(createMachineCategoryDto: CreateMachineCategoryDto) {
    return 'This action adds a new machineCategory';
  }

  findAll() {
    return `This action returns all machineCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} machineCategory`;
  }

  update(id: number, updateMachineCategoryDto: UpdateMachineCategoryDto) {
    return `This action updates a #${id} machineCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} machineCategory`;
  }
}
