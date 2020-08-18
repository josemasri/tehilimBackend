import { Controller, Post, Body, Get } from '@nestjs/common';
import { InscriptionDto } from 'src/dtos/inscription.dto';
import { TehilimService } from './tehilim.service';

@Controller('tehilim')
export class TehilimController {
  constructor(private readonly tehilimService: TehilimService) {}

  @Post()
  async inscription(@Body() inscriptionDto: InscriptionDto): Promise<any> {
    return await this.tehilimService.inscription(inscriptionDto);
  }

  @Get('info')
  async getInfo(): Promise<any> {
    return await this.tehilimService.getInfo();
  }
}
