import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MachineCategoryService } from './machine_category.service';
import { CreateMachineCategoryDto } from './dto/create-machine_category.dto';
import { UpdateMachineCategoryDto } from './dto/update-machine_category.dto';

@Controller('machine-category')
export class MachineCategoryController {
  constructor(private readonly machineCategoryService: MachineCategoryService) {}

  @Post()
  create(@Body() createMachineCategoryDto: CreateMachineCategoryDto) {
    return this.machineCategoryService.create(createMachineCategoryDto);
  }

  @Get()
  findAll() {
    return this.machineCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.machineCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMachineCategoryDto: UpdateMachineCategoryDto) {
    return this.machineCategoryService.update(+id, updateMachineCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.machineCategoryService.remove(+id);
  }
}
