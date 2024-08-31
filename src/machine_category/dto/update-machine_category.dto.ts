import { PartialType } from '@nestjs/mapped-types';
import { CreateMachineCategoryDto } from './create-machine_category.dto';

export class UpdateMachineCategoryDto extends PartialType(CreateMachineCategoryDto) {}
