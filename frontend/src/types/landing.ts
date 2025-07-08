// Types para a landing page
export interface Temporada {
  id: number;
  numero: number;
  anoInicio: number;
  anoFim: number;
  ativa: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export interface Torneio {
  id: number;
  nome: string;
  descricao?: string;
  dataInicio: string;
  dataFim?: string;
  preco?: number;
  localId?: number;
  temporadaId: number;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
  local?: {
    id: number;
    nome: string;
    endereco?: string;
  };
  temporada?: Temporada;
}

export interface EstatisticasLanding {
  totalJogadores: number;
  totalTorneios: number;
  premiacaoTotal: number;
  temporadaAtual: number;
}

export interface JogadorRanking {
  id: number;
  nome: string;
  pontuacao: number;
  posicao: number;
  torneiosParticipados: number;
  vitorias: number;
}

export interface ProximoTorneio {
  id: number;
  nome: string;
  descricao?: string;
  dataInicio: string;
  preco?: number;
  local?: {
    nome: string;
    endereco?: string;
  };
  vagas?: number;
  inscritos?: number;
}
