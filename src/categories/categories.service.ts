import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { getSlug } from "src/shared/lib/getSlug";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const slug = getSlug(createCategoryDto.name);
    return this.prisma.category.create({ data: { ...createCategoryDto, slug } });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const doesCategoryExists = await this.prisma.category.findUnique({ where: { id } });
    if (!doesCategoryExists) throw new Error("Category not found");

    const slug = getSlug(updateCategoryDto.name);

    return this.prisma.category.update({ where: { id }, data: { ...updateCategoryDto, slug } });
  }

  async remove(id: string) {
    const doesCategoryExists = await this.prisma.category.findUnique({ where: { id } });
    if (!doesCategoryExists) throw new Error("Category not found");
    return this.prisma.category.delete({ where: { id } });
  }
}
