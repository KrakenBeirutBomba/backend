import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BarsModule } from "./modules/bars/bars.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { ProductsModule } from "./modules/products/products.module";
import { PrismaModule } from "./shared/modules/prisma/prisma.module";

@Module({
  imports: [ProductsModule, PrismaModule, CategoriesModule, BarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
