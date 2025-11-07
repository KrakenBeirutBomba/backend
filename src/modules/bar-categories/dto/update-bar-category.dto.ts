import { PartialType } from '@nestjs/mapped-types';
import { CreateBarCategoryDto } from './create-bar-category.dto';

export class UpdateBarCategoryDto extends PartialType(CreateBarCategoryDto) {}
