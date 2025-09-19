import { IsOptional, IsString } from "class-validator";

export class CreateBarDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
