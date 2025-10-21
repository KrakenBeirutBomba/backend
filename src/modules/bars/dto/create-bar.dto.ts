import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBarDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
