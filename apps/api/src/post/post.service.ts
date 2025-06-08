import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {DEFAULT_PAGE_SIZE} from "../constants";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll({skip = 0, take = DEFAULT_PAGE_SIZE}: {skip?: number, take?: number}) {
    return await this.prisma.post.findMany({
      skip,
      take,
    });
  }

  async count() {
    return await this.prisma.post.count({})
  }
}
