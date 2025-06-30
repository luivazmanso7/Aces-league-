import { jogadorService } from './jogador.service';
import { torneioApi } from './torneio.service';
import { temporadaApi } from './temporada.service';

export interface DashboardStatistics {
  totalJogadores: number;
  jogadoresAtivos: number;
  totalTorneios: number;
  torneiosAtivos: number;
  temporadaAtual?: {
    id: number;
    nome: string;
    ano: number;
    torneiosRealizados: number;
    totalTorneios: number;
  };
  proximoTorneio?: {
    id: number;
    nome: string;
    data_hora: string;
    local: string;
  };
  topJogadores: Array<{
    id: number;
    nome: string;
    apelido?: string;
    total_pontos: number;
    vitorias: number;
  }>;
  estatisticasRecentes: {
    novosCadastros30Dias: number;
    torneiosUltimos30Dias: number;
    participacoesUltimos30Dias: number;
  };
}

// Tipos para os dados dos gráficos
export interface ParticipacaoMensal {
  mes: string;
  participacoes: number;
  torneios: number;
}

export interface DistribuicaoJogadores {
  name: string;
  value: number;
  color: string;
}

export interface RankingMedioTorneio {
  torneio: string;
  mediaPontos: number;
  participantes: number;
  data: string;
}

export interface EvolucaoRanking {
  mes: string;
  [key: string]: string | number; // Para armazenar posições dos jogadores dinamicamente
}

export const dashboardService = {
  // Buscar todas as estatísticas do dashboard
  async getStatistics(): Promise<DashboardStatistics> {
    try {
      // Executar todas as consultas em paralelo
      const [
        jogadores,
        torneios,
        temporadaAtual,
        topWinners
      ] = await Promise.all([
        jogadorService.findAll(),
        torneioApi.findAll(),
        temporadaApi.findCurrent(),
        jogadorService.getTopWinners(5)
      ]);

      // Calcular estatísticas de jogadores
      const totalJogadores = jogadores.length;
      const jogadoresAtivos = jogadores.filter(j => j.ativo).length;

      // Calcular estatísticas de torneios
      const totalTorneios = torneios.length;
      const torneiosAtivos = torneios.filter(t => t.ativo).length;

      // Encontrar próximo torneio (não finalizado e com data futura)
      const now = new Date();
      const proximoTorneio = torneios
        .filter(t => t.ativo && new Date(t.data_hora) > now)
        .sort((a, b) => new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime())[0];

      // Estatísticas da temporada atual
      let temporadaAtualInfo;
      if (temporadaAtual) {
        const torneiosTemporada = torneios.filter(t => t.id_temporada === temporadaAtual.id);
        temporadaAtualInfo = {
          id: temporadaAtual.id,
          nome: temporadaAtual.nome,
          ano: temporadaAtual.ano,
          torneiosRealizados: torneiosTemporada.length,
          totalTorneios: 12 // Máximo por temporada
        };
      }

      // Calcular estatísticas dos últimos 30 dias
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const novosCadastros30Dias = jogadores.filter(j => 
        new Date(j.criado_em) >= thirtyDaysAgo
      ).length;

      const torneiosUltimos30Dias = torneios.filter(t => 
        new Date(t.data_hora) >= thirtyDaysAgo
      ).length;

      // Calcular participações dos últimos 30 dias seria necessário um endpoint específico
      // Por enquanto, vamos usar uma estimativa baseada nos torneios
      const participacoesUltimos30Dias = torneiosUltimos30Dias * 8; // Estimativa de 8 participantes por torneio

      return {
        totalJogadores,
        jogadoresAtivos,
        totalTorneios,
        torneiosAtivos,
        temporadaAtual: temporadaAtualInfo,
        proximoTorneio: proximoTorneio ? {
          id: proximoTorneio.id,
          nome: proximoTorneio.nome,
          data_hora: proximoTorneio.data_hora,
          local: proximoTorneio.local
        } : undefined,
        topJogadores: topWinners.map(j => ({
          id: j.id,
          nome: j.nome,
          apelido: j.apelido,
          total_pontos: j.total_pontos || 0,
          vitorias: j.vitorias || 0
        })),
        estatisticasRecentes: {
          novosCadastros30Dias,
          torneiosUltimos30Dias,
          participacoesUltimos30Dias
        }
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas do dashboard:', error);
      throw error;
    }
  },

  // Buscar estatísticas rápidas (versão simplificada)
  async getQuickStats(): Promise<{
    totalJogadores: number;
    torneiosAtivos: number;
    temporadaAtual?: string;
  }> {
    try {
      const [jogadores, torneios, temporadaAtual] = await Promise.all([
        jogadorService.findAll(),
        torneioApi.findAll(),
        temporadaApi.findCurrent()
      ]);

      return {
        totalJogadores: jogadores.length,
        torneiosAtivos: torneios.filter(t => t.ativo).length,
        temporadaAtual: temporadaAtual ? `${temporadaAtual.nome} (${temporadaAtual.ano})` : undefined
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas rápidas:', error);
      throw error;
    }
  },

  // Obter dados de participações por mês
  async getParticipacoesPorMes(): Promise<ParticipacaoMensal[]> {
    try {
      const [torneios, temporadaAtual] = await Promise.all([
        torneioApi.findAll(),
        temporadaApi.findCurrent()
      ]);

      // Filtrar torneios da temporada atual
      const torneiosTemporada = temporadaAtual 
        ? torneios.filter(t => t.id_temporada === temporadaAtual.id)
        : torneios.slice(-12); // Últimos 12 torneios se não houver temporada atual

      // Agrupar por mês
      const dadosPorMes = torneiosTemporada.reduce((acc, torneio) => {
        const data = new Date(torneio.data_hora);
        const mes = data.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
        
        if (!acc[mes]) {
          acc[mes] = { torneios: 0, participacoes: 0 };
        }
        
        acc[mes].torneios += 1;
        acc[mes].participacoes += torneio.participacoes?.length || 0;
        
        return acc;
      }, {} as Record<string, { torneios: number; participacoes: number }>);

      // Converter para array e ordenar por data
      return Object.entries(dadosPorMes)
        .map(([mes, dados]) => ({
          mes,
          participacoes: dados.participacoes,
          torneios: dados.torneios
        }))
        .sort((a, b) => {
          // Ordenar por mês (assumindo formato "MMM/YY")
          const [mesA] = a.mes.split('/');
          const [mesB] = b.mes.split('/');
          const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
          return meses.indexOf(mesA.toLowerCase()) - meses.indexOf(mesB.toLowerCase());
        });
    } catch (error) {
      console.error('❌ Erro ao buscar participações por mês:', error);
      throw error;
    }
  },

  // Obter distribuição de jogadores ativos vs inativos
  async getDistribuicaoJogadores(): Promise<DistribuicaoJogadores[]> {
    try {
      const jogadores = await jogadorService.findAll();
      
      const ativos = jogadores.filter(j => j.ativo).length;
      const inativos = jogadores.filter(j => !j.ativo).length;

      return [
        { name: 'Ativos', value: ativos, color: '#22c55e' },
        { name: 'Inativos', value: inativos, color: '#ef4444' }
      ];
    } catch (error) {
      console.error('❌ Erro ao buscar distribuição de jogadores:', error);
      throw error;
    }
  },

  // Obter ranking médio por torneio
  async getRankingMedioTorneio(): Promise<RankingMedioTorneio[]> {
    try {
      console.log('🔍 Buscando ranking médio por torneio...');
      const [torneios, temporadaAtual] = await Promise.all([
        torneioApi.findAll(),
        temporadaApi.findCurrent()
      ]);

      console.log('📊 Torneios encontrados:', torneios.length);

      // Filtrar torneios da temporada atual que tenham participações
      const torneiosComParticipacoes = temporadaAtual 
        ? torneios.filter(t => t.id_temporada === temporadaAtual.id && t.participacoes && t.participacoes.length > 0)
        : torneios.filter(t => t.participacoes && t.participacoes.length > 0).slice(-8); // Últimos 8 torneios

      console.log('🎯 Torneios com participações:', torneiosComParticipacoes.length);

      const rankingMedio = torneiosComParticipacoes.map(torneio => {
        const participacoes = torneio.participacoes || [];
        const totalPontos = participacoes.reduce((sum, p) => sum + (p.pontuacao || 0), 0);
        const mediaPontos = participacoes.length > 0 ? Math.round(totalPontos / participacoes.length) : 0;
        
        return {
          torneio: torneio.nome.length > 15 ? torneio.nome.substring(0, 15) + '...' : torneio.nome,
          mediaPontos,
          participantes: participacoes.length,
          data: new Date(torneio.data_hora).toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit' 
          })
        };
      })
      .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()) // Ordenar por data
      .slice(-6); // Pegar os últimos 6 torneios

      console.log('✅ Ranking médio calculado:', rankingMedio);
      return rankingMedio;
    } catch (error) {
      console.error('❌ Erro ao buscar ranking médio por torneio:', error);
      throw error;
    }
  },

  // Obter evolução do ranking (Top 3 ao longo dos meses)
  async getEvolucaoRanking(): Promise<EvolucaoRanking[]> {
    try {
      const [temporadaAtual, torneios] = await Promise.all([
        temporadaApi.findCurrent(),
        torneioApi.findAll()
      ]);

      if (!temporadaAtual) {
        throw new Error('Nenhuma temporada atual encontrada');
      }

      // Buscar torneios da temporada atual ordenados por data
      const torneiosTemporada = torneios
        .filter(t => t.id_temporada === temporadaAtual.id)
        .sort((a, b) => new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime());

      if (torneiosTemporada.length === 0) {
        throw new Error('Nenhum torneio encontrado para a temporada atual');
      }

      // Buscar o ranking atual para identificar os top 3
      const rankingAtual = await temporadaApi.getRanking(temporadaAtual.id);
      const top3Jogadores = rankingAtual.slice(0, 3);

      if (top3Jogadores.length === 0) {
        throw new Error('Nenhum ranking encontrado');
      }

      // Para implementação completa, seria necessário calcular o ranking progressivo
      // Por enquanto, retornamos erro para não mostrar dados falsos
      throw new Error('Funcionalidade de evolução do ranking ainda não implementada completamente');
    } catch (error) {
      console.error('❌ Erro ao buscar evolução do ranking:', error);
      throw error;
    }
  },

  // Formatar data para exibição
  formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Formatar números para exibição
  formatNumber(num: number): string {
    return num.toLocaleString('pt-BR');
  }
};
