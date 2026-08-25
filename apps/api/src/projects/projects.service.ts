import { Inject, Injectable } from '@nestjs/common';
import type { Project } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

const publicProjectSlugs = ['seller-platform', 'air-planner', 'webloftdesign'];

@Injectable()
export class ProjectsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  findAll(): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        slug: { in: publicProjectSlugs },
      },
      orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
    });
  }
}
