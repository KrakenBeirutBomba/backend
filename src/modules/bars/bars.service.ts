import { Injectable } from "@nestjs/common";
import { CreateBarDto } from "./dto/create-bar.dto";
import { UpdateBarDto } from "./dto/update-bar.dto";
import { PrismaService } from "src/shared/modules/prisma/prisma.service";

@Injectable()
export class BarsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createBarDto: CreateBarDto) {
    return this.prisma.bar.create({
      data: createBarDto,
    });
  }

  findAll() {
    return this.prisma.bar.findMany();
  }

  findOne(id: string) {
    return this.prisma.bar.findUnique({
      where: { id },
    });
  }

  update(id: string, updateBarDto: UpdateBarDto) {
    return this.prisma.bar.update({
      where: { id },
      data: updateBarDto,
    });
  }

  remove(id: string) {
    return this.prisma.bar.delete({
      where: { id },
    });
  }
}
