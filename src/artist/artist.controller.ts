import { Controller, Get, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artists')
export class ArtistController {

    constructor(
        private artistService: ArtistService,
      ) {}
    
      @Get()
      getArtists() {
        return this.artistService.getArtists();
      }
    
      @Get(':id')
      getArtistById(
        @Param('id', ParseIntPipe) artistId: number,
      ) {
        return this.artistService.getArtistById(
            artistId,
        );
      }
    
      @Post('create')
      createArtist(
        @Body() dto: CreateArtistDto,
      ) {
        return this.artistService.createArtist(
          dto,
        );
      }
}
