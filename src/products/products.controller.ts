import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  // публичные
  @Get()
  findAll(
    @Query("categoryId") categoryId?: string,
    @Query("q") q?: string,
    @Query("page") page = "1",
    @Query("pageSize") pageSize = "24",
  ) {
    return this.service.findAll({
      categoryId,
      q,
      page: Number(page) || 1,
      pageSize: Math.min(Number(pageSize) || 24, 100),
    });
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.service.findBySlug(slug);
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
