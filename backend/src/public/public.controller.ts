import { Controller, Get } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public/api')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('proximo-torneio')
  async getProximoTorneio() {
    return this.publicService.getProximoTorneio();
  }

  @Get('ranking')
  async getRankingJogadores() {
    return this.publicService.getRankingJogadores();
  }

  @Get('temporadas')
  async getTemporadas() {
    return this.publicService.getTemporadas();
  }

  @Get('estatisticas')
  async getEstatisticas() {
    return this.publicService.getEstatisticas();
  }
}