import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { ProjectModel } from './project.model';
import { ProjectsService } from './projects.service';

@Resolver(() => ProjectModel)
export class ProjectsResolver {
  constructor(@Inject(ProjectsService) private readonly projectsService: ProjectsService) {}

  @Query(() => [ProjectModel], { name: 'projects' })
  projects(): Promise<ProjectModel[]> {
    return this.projectsService.findAll();
  }
}
