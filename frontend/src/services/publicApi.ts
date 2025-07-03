// Serviço para consumir dados da API pública para a landing page
import { 
  Foto, 
  Temporada, 
  EstatisticasLanding, 
  JogadorRanking, 
  ProximoTorneio 
} from '@/types/landing';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export class PublicApiService {
  
  // Buscar fotos da galeria
  static async getFotosGaleria(): Promise<Foto[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/api/galeria`);
      if (!response.ok) throw new Error('Erro ao buscar fotos da galeria');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar fotos da galeria:', error);
      return [];
    }
  }

  // Buscar fotos por categoria
  static async getFotosPorCategoria(categoria: string): Promise<Foto[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/fotos/categoria/${categoria}`);
      if (!response.ok) throw new Error(`Erro ao buscar fotos da categoria ${categoria}`);
      return await response.json();
    } catch (error) {
      console.error(`Erro ao buscar fotos da categoria ${categoria}:`, error);
      return [];
    }
  }

  // Buscar fotos do Hall da Fama
  static async getFotosHallDaFama(): Promise<Foto[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/fotos/hall-da-fama`);
      if (!response.ok) throw new Error('Erro ao buscar fotos do Hall da Fama');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar fotos do Hall da Fama:', error);
      return [];
    }
  }

  // Buscar melhores momentos
  static async getFotosMelhoresMomentos(): Promise<Foto[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/fotos/melhores-momentos`);
      if (!response.ok) throw new Error('Erro ao buscar melhores momentos');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar melhores momentos:', error);
      return [];
    }
  }

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

  // Buscar fotos de uma temporada específica
  static async getFotosTemporada(temporadaId: number): Promise<Foto[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/fotos/temporada/${temporadaId}`);
      if (!response.ok) throw new Error(`Erro ao buscar fotos da temporada ${temporadaId}`);
      return await response.json();
    } catch (error) {
      console.error(`Erro ao buscar fotos da temporada ${temporadaId}:`, error);
      return [];
    }
  }

  // Buscar fotos de um torneio específico
  static async getFotosTorneio(torneioId: number): Promise<Foto[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/fotos/torneio/${torneioId}`);
      if (!response.ok) throw new Error(`Erro ao buscar fotos do torneio ${torneioId}`);
      return await response.json();
    } catch (error) {
      console.error(`Erro ao buscar fotos do torneio ${torneioId}:`, error);
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

  // Buscar ranking de jogadores da API
  static async getRankingJogadores(): Promise<JogadorRanking[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/api/ranking`);
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
      const response = await fetch(`${API_BASE_URL}/public/torneios/proximo`);
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
