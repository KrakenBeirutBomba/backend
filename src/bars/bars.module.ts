import { Module } from "@nestjs/common";
import { BarsService } from "./bars.service";
import { BarsController } from "./bars.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [BarsController],
  providers: [BarsService],
})
export class BarsModule {}
