import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBarCategoryDto } from "./dto/create-bar-category.dto";
import { UpdateBarCategoryDto } from "./dto/update-bar-category.dto";
import { PrismaService } from "src/shared/modules/prisma/prisma.service";
import { getSlug } from "src/shared/lib/getSlug";

@Injectable()
export class BarCategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(barId: string, createCategoryDto: CreateBarCategoryDto) {
    const categoryExists = await this.prisma.category.findUnique({
      where: {
        name_barId: {
          name: createCategoryDto.name,
          barId,
        },
      },
    });

    if (categoryExists) {
      throw new ConflictException("Category with this name already exists in the specified bar");
    }

    const slug = getSlug(createCategoryDto.name);

    const slugExists = await this.prisma.category.findUnique({
      where: {
        slug_barId: {
          slug,
          barId,
        },
      },
    });

    if (slugExists) {
      throw new ConflictException("Category with this slug already exists in the specified bar");
    }

    return this.prisma.category.create({ data: { ...createCategoryDto, slug, barId } });
  }

  findAll(barId: string) {
    return this.prisma.category.findMany({ where: { barId } });
  }

  async findOne(barId: string, id: string) {
    const category = await this.prisma.category.findFirst({ where: { id, barId } });
    if (!category) throw new NotFoundException("Category not found in the specified bar");
    return category;
  }

  async update(barId: string, id: string, updateCategoryDto: UpdateBarCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id, barId } });
    if (!category) throw new NotFoundException("Category not found in the specified bar");

    let slug = category.slug;

    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      const nameExists = await this.prisma.category.findUnique({
        where: {
          name_barId: {
            name: updateCategoryDto.name,
            barId,
          },
        },
      });

      if (nameExists) {
        throw new ConflictException("Category with this name already exists in the specified bar");
      }

      slug = getSlug(updateCategoryDto.name);

      const slugExists = await this.prisma.category.findUnique({
        where: {
          slug_barId: {
            slug,
            barId,
          },
        },
      });

      if (slugExists) {
        throw new ConflictException("Category with this slug already exists in the specified bar");
      }
    }

    return this.prisma.category.update({ where: { id, barId }, data: { ...updateCategoryDto, slug } });
  }

  async remove(barId: string, id: string) {
    const category = await this.prisma.category.findUnique({ where: { id, barId } });
    if (!category) throw new NotFoundException("Category not found in the specified bar");
    return this.prisma.category.delete({ where: { id } });
  }
}
