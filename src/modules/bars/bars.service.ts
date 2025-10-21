import { Injectable } from "@nestjs/common";
import { CreateBarDto } from "./dto/create-bar.dto";
import { UpdateBarDto } from "./dto/update-bar.dto";
import { PrismaService } from "src/shared/modules/prisma/prisma.service";
import { getSlug } from "src/shared/lib/getSlug";
import { ConflictException, NotFoundException } from "@nestjs/common";

@Injectable()
export class BarsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBarDto: CreateBarDto) {
    const nameExists = await this.prisma.bar.findUnique({
      where: { name: createBarDto.name },
    });
    if (nameExists) {
      throw new ConflictException("Bar with this name already exists");
    }
    const slug = getSlug(createBarDto.name);
    const slugExists = await this.prisma.bar.findUnique({
      where: { slug },
    });
    if (slugExists) {
      throw new ConflictException("Bar with this slug already exists");
    }
    return this.prisma.bar.create({
      data: { ...createBarDto, slug },
    });
  }

  findAll() {
    return this.prisma.bar.findMany({
      orderBy: { createdAt: "desc" }, // Сортировка по дате создания (новые первые)
    });
  }

  async findOne(id: string) {
    const bar = await this.prisma.bar.findUnique({
      where: { id },
    });
    if (!bar) {
      throw new NotFoundException(`Bar with id ${id} not found`);
    }
    return bar;
  }

  async update(id: string, updateBarDto: UpdateBarDto) {
    const bar = await this.prisma.bar.findUnique({ where: { id } });
    if (!bar) {
      throw new NotFoundException(`Bar with id ${id} not found`);
    }
    let newSlug = updateBarDto.name ? getSlug(updateBarDto.name) : bar.slug;

    return this.prisma.bar.update({
      where: { id },
      data: { ...updateBarDto, slug: newSlug },
    });
  }

  async remove(id: string) {
    const bar = await this.prisma.bar.findUnique({ where: { id } });
    if (!bar) {
      throw new NotFoundException(`Bar with id ${id} not found`);
    }
    return this.prisma.bar.delete({
      where: { id },
    });
  }
}
