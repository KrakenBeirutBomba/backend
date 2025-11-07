import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BarsModule } from "./modules/bars/bars.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { ProductsModule } from "./modules/products/products.module";
import { PrismaModule } from "./shared/modules/prisma/prisma.module";
import { BarCategoriesModule } from "./modules/bar-categories/bar-categories.module";

@Module({
  imports: [ProductsModule, PrismaModule, CategoriesModule, BarsModule, BarCategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
