 
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InscriptionDto {
  @ApiProperty({
    type: String,
    example: 'test@mail.com',
  })
  @IsEmail()
  mail: string;
  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: String,
    example: 'test@mail.com',
  })
  @IsOptional()
  @IsString()
  beraja: string;

  @ApiProperty({
    type: String,
    example: 'Jacobo ben Sara',
  })
  @IsOptional()
  @IsString()
  refua: string;

  @ApiProperty({
    type: String,
    example: 'Jacobo ben Sara',
  })
  @IsOptional()
  @IsString()
  zibug: string;

  @ApiProperty({
    type: String,
    example: 'Jacobo ben Sara',
  })
  @IsOptional()
  @IsString()
  zera: string;

  @ApiProperty({
    type: String,
    example: 'Jacobo ben Sara',
  })
  @IsOptional()
  @IsString()
  leiluy: string;

  @ApiProperty({
    type: String,
    example: 'Jacobo ben Sara',
  })
  @IsOptional()
  @IsString()
  matir: string;
}