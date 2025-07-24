// Serviço para consumir dados da API pública para a landing page
import { 
  Temporada, 
  EstatisticasLanding, 
  JogadorRanking, 
  ProximoTorneio 
} from '@/types/landing';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export class PublicApiService {
  
  // Buscar temporadas
  static async getTemporadas(): Promise<Temporada[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/api/temporadas`);
      if (!response.ok) throw new Error('Erro ao buscar temporadas');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar temporadas:', error);
      return [];
    }
  }

  // Gerar estatísticas para a landing page baseadas nos dados disponíveis
  static async getEstatisticasLanding(): Promise<EstatisticasLanding> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/api/estatisticas`);
      if (!response.ok) throw new Error('Erro ao buscar estatísticas');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      
      // Fallback com dados mock em caso de erro
      return {
        totalJogadores: 0,
        totalTorneios: 0,
        premiacaoTotal: 0,
        temporadaAtual: new Date().getFullYear()
      };
    }
  }

  // Buscar ranking de jogadores da API para uma temporada específica
  static async getRankingJogadores(temporadaId: number): Promise<JogadorRanking[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/api/temporadas/${temporadaId}/ranking`);
      if (!response.ok) throw new Error('Erro ao buscar ranking de jogadores');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar ranking de jogadores:', error);
      return [];
    }
  }

  // Buscar próximo torneio da API
  static async getProximoTorneio(): Promise<ProximoTorneio | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/api/proximo-torneio`);
      if (!response.ok) {
        console.error('Erro na API:', response.status, response.statusText);
        throw new Error(`Erro ao buscar próximo torneio: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transformar os dados para o formato esperado
      return {
        id: data.id,
        nome: data.nome,
        descricao: data.descricao,
        dataInicio: data.dataInicio,
        preco: data.preco ? parseFloat(data.preco) : undefined,
        local: data.local,
        vagas: data.vagas,
        inscritos: data.inscritos
      };
    } catch (error) {
      console.error('Erro ao buscar próximo torneio:', error);
      return null;
    }
  }
}
