import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
    
    constructor(private prisma: PrismaService) {}

    getArtistProjects(artistId: number) {
        return this.prisma.project.findMany({
            where: {
                artistId,
            },
        });
    }

    getProjectById(
        projectId: number,
    ) {
        return this.prisma.project.findFirst({
            where: {
                id: projectId
            },
        });
    }

    async createArtistProject( dto ) {
        
        const { amount, artistId, ...rest } = dto;
    
        const convertedData = {
        ...rest,
        amount: parseFloat(amount),
        artistId: parseInt(artistId, 10),
        };

        const project =
        await this.prisma.project.create({
            data: {
                ...convertedData,
            },
        });

        return project;
    }

}
