import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsString,
  } from 'class-validator';
  
  export class CreateProjectDto {
    @IsNumberString()
    @IsNotEmpty()
    artistId: number;
  
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsNumberString()
    @IsNotEmpty()
    amount: number;
  }