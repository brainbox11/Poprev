import { Controller, Body, Post, Param, ParseIntPipe, Get } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {

    constructor(
        private projectService: ProjectService,
      ) {}
    
      @Get('artist/:artist')
      getArtistProjects(@Param('artist', ParseIntPipe) artist: number) {
        return this.projectService.getArtistProjects(artist);
      }
    
      @Get(':id')
      getProjectById(
        @Param('id', ParseIntPipe) projectId: number,
      ) {
        return this.projectService.getProjectById(
            projectId,
        );
      }
    
      @Post('create')
      createArtistProject(
        @Body() dto: CreateProjectDto,
      ) {
        return this.projectService.createArtistProject(
          dto,
        );
      }

}
