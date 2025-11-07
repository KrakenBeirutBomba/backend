import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { BarCategoriesService } from "./bar-categories.service";
import { CreateBarCategoryDto } from "./dto/create-bar-category.dto";
import { UpdateBarCategoryDto } from "./dto/update-bar-category.dto";

@Controller("bars/:barId/categories")
export class BarCategoriesController {
  constructor(private readonly barCategoriesService: BarCategoriesService) {}

  @Post()
  create(@Param("barId") barId: string, @Body() createCategoryDto: CreateBarCategoryDto) {
    return this.barCategoriesService.create(barId, createCategoryDto);
  }

  @Get()
  findAll(@Param("barId") barId: string) {
    return this.barCategoriesService.findAll(barId);
  }

  @Get(":id")
  findOne(@Param("barId") barId: string, @Param("id") id: string) {
    return this.barCategoriesService.findOne(barId, id);
  }

  @Patch(":id")
  update(@Param("barId") barId: string, @Param("id") id: string, @Body() updateCategoryDto: UpdateBarCategoryDto) {
    return this.barCategoriesService.update(barId, id, updateCategoryDto);
  }

  @Delete(":id")
  remove(@Param("barId") barId: string, @Param("id") id: string) {
    return this.barCategoriesService.remove(barId, id);
  }
}
