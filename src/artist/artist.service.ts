import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {

    constructor(private prisma: PrismaService) {}

    getArtists() {
        return this.prisma.artist.findMany();
    }

    getArtistById(
        artistId: number,
    ) {
        return this.prisma.artist.findFirst({
        where: {
            id: artistId
        },
        });
    }

    async createArtist(
        dto: CreateArtistDto,
    ) {
        const artist =
        await this.prisma.artist.create({
            data: {
            ...dto,
            },
        });

        return artist;
    }

}
