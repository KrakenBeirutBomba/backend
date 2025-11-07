import { Module } from "@nestjs/common";
import { BarCategoriesService } from "./bar-categories.service";
import { BarCategoriesController } from "./bar-categories.controller";
import { PrismaModule } from "src/shared/modules/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [BarCategoriesController],
  providers: [BarCategoriesService],
})
export class BarCategoriesModule {}
