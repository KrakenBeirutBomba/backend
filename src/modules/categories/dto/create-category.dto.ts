import { IsOptional, IsString, Length, MaxLength } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @Length(2, 50)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  barId!: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
