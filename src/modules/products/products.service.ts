import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Decimal } from "@prisma/client/runtime/library";
import { getSlug } from "src/shared/lib/getSlug";
import { PrismaService } from "src/shared/modules/prisma/prisma.service";

const toDecimal = (x: string) => new Decimal(x);
const mapPrice = (p: any) => (p?.toFixed ? p.toFixed(2) : p);

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const doesCategoryExists = await this.prisma.category.findUnique({
      where: { id: createProductDto.categoryId },
    });
    if (!doesCategoryExists) throw new NotFoundException("Category not found");

    const slug = getSlug(createProductDto.name);

    const created = await this.prisma.product.create({
      data: { ...createProductDto, price: toDecimal(createProductDto.price), slug },
    });

    return { ...created, price: mapPrice(created.price) };
  }

  async findAll(params: { categoryId?: string; q?: string; page?: number; pageSize?: number }) {
    const { categoryId, q, page = 1, pageSize = 10 } = params;
    const where: any = {
      AND: [
        q
          ? {
              OR: [{ name: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }],
            }
          : {},
      ],
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        orderBy: { name: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items: items.map((p) => ({ ...p, price: mapPrice(p.price) })),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException("Product not found");
    return { ...product, price: mapPrice(product.price) };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const exists = await this.prisma.product.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException("Product not found");

    const updated = await this.prisma.product.update({
      where: { id },
      data: { ...updateProductDto, price: toDecimal(updateProductDto.price) as any },
    });
    return { ...updated, price: mapPrice(updated.price) };
  }

  async remove(id: string) {
    const exists = await this.prisma.product.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException("Product not found");
    await this.prisma.product.delete({ where: { id } });
    return { ok: true };
  }
}
