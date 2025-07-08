import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicService {
  constructor(private prisma: PrismaService) {}

  async getProximoTorneio() {
    const agora = new Date();
    
    // Buscar o torneio com data mais próxima do futuro (ativo)
    const proximoTorneio = await this.prisma.torneio.findFirst({
      where: {
        data_hora: {
          gte: agora, // Apenas torneios futuros
        },
        ativo: true, // Apenas torneios ativos
      },
      orderBy: {
        data_hora: 'asc', // Ordem crescente (mais próximo primeiro)
      },
      select: {
        id: true,
        nome: true,
        data_hora: true,
        local: true,
        buy_in: true,
        valor_staff: true,
        observacoes: true,
        temporada: {
          select: {
            id: true,
            nome: true,
            ano: true,
          }
        },
        _count: {
          select: {
            participacoes: true,
          },
        },
      },
    });

    if (!proximoTorneio) {
      return null;
    }

    // Mapear para o formato esperado pelo frontend
    return {
      id: proximoTorneio.id,
      nome: proximoTorneio.nome,
      descricao: proximoTorneio.observacoes,
      dataInicio: proximoTorneio.data_hora,
      preco: proximoTorneio.buy_in ? parseFloat(proximoTorneio.buy_in.toString()) : undefined,
      local: {
        nome: proximoTorneio.local,
      },
      temporada: proximoTorneio.temporada,
      inscritos: proximoTorneio._count.participacoes,
    };
  }

  async getRankingJogadores() {
    try {
      console.log(' Buscando ranking de jogadores...');
      
      // Teste simples primeiro - buscar temporadas
      const temporadas = await this.prisma.temporada.findMany();
      console.log(' Temporadas encontradas:', temporadas);

      // Teste - buscar todos os rankings
      const todosRankings = await this.prisma.ranking.findMany();
      console.log(' Total de rankings no banco:', todosRankings.length);

      // Buscar temporada mais recente
      const temporadaAtual = await this.prisma.temporada.findFirst({
        orderBy: { ano: 'desc' },
      });

      console.log('Temporada atual:', temporadaAtual);

      if (!temporadaAtual) {
        console.log(' Nenhuma temporada encontrada');
        return [];
      }

      // Buscar ranking da temporada atual com dados dos jogadores
      const ranking = await this.prisma.ranking.findMany({
        where: {
          id_temporada: temporadaAtual.id,
        },
        orderBy: {
          posicao: 'asc',
        },
        take: 10, // Top 10 jogadores
        include: {
          jogador: {
            select: {
              id: true,
              nome: true,
              apelido: true,
              total_torneios: true,
              vitorias: true,
            },
          },
        },
      });

      console.log(' Ranking encontrado:', ranking.length, 'jogadores');
      console.log(' Dados do ranking:', JSON.stringify(ranking, null, 2));

      return ranking.map(item => ({
        id: item.jogador.id,
        nome: item.jogador.nome,
        apelido: item.jogador.apelido,
        pontos: item.pontuacao,
        posicao: item.posicao,
        torneiosJogados: item.jogador.total_torneios,
        vitorias: item.jogador.vitorias,
      }));
    } catch (error) {
      console.error('Erro ao buscar ranking:', error);
      return [];
    }
  }

  async getTemporadas() {
    // Buscar todas as temporadas
    const temporadas = await this.prisma.temporada.findMany({
      orderBy: {
        ano: 'desc',
      },
      select: {
        id: true,
        nome: true,
        ano: true,
        criada_em: true,
      },
    });

    return temporadas;
  }

  async getEstatisticas() {
    const [totalJogadores, totalTorneios, temporadaAtual] = await Promise.all([
      this.prisma.jogador.count({
        where: { ativo: true },
      }),
      this.prisma.torneio.count(),
      this.prisma.temporada.findFirst({
        orderBy: { ano: 'desc' },
      }),
    ]);

    // Calcular premiação total (soma dos buy-ins de todos os torneios)
    const premiacaoResult = await this.prisma.torneio.aggregate({
      _sum: {
        buy_in: true,
      },
    });

    return {
      totalJogadores,
      totalTorneios,
      premiacaoTotal: premiacaoResult._sum.buy_in || 0,
      temporadaAtual: temporadaAtual?.ano || new Date().getFullYear(),
    };
  }
}
