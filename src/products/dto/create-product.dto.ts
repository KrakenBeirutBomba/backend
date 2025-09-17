import { Transform } from "class-transformer";
import { IsOptional, IsString, IsUUID, Length, Matches } from "class-validator";

export class CreateProductDto {
  @IsString()
  @Length(2, 120)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsString()
  price!: string;

  @IsOptional()
  @IsString()
  method?: string;

  @IsOptional()
  @IsString()
  ingredients?: string;

  @IsString()
  categoryId!: string;
}
