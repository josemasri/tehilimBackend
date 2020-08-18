 
import { IsEmail, IsNumber } from 'class-validator';
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
}