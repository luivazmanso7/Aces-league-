'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { 
  dashboardService
} from '@/services/dashboard.service';

// Tooltip customizado
const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          background: 'rgba(30, 30, 30, 0.95)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: 2,
          p: 2
        }}
      >
        <Typography variant="body2" sx={{ color: '#f59e0b', mb: 1 }}>
          {label}
        </Typography>
        {payload.map((entry, index: number) => (
          <Typography key={index} variant="body2" sx={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

// Hook para carregamento de dados
function useChartData<T>(fetchData: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');
        const result = await fetchData();
        setData(result);
      } catch (err) {
        console.error('Erro ao carregar dados do gráfico:', err);
        setError('Erro ao carregar dados');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}

// Gráfico de Participações por Mês
export function ParticipacoesPorMesChart() {
  const { data, loading, error } = useChartData(
    dashboardService.getParticipacoesPorMes
  );

  if (loading) {
    return (
      <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#f59e0b' }} />
      </Box>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <Alert severity="warning" sx={{ bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
        {error || 'Nenhum dado disponível'}
      </Alert>
    );
  }

  return (
    <Box sx={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(245, 158, 11, 0.1)" />
          <XAxis 
            dataKey="mes" 
            stroke="rgba(255, 255, 255, 0.7)"
            fontSize={12}
          />
          <YAxis 
            stroke="rgba(255, 255, 255, 0.7)"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="participacoes" 
            fill="url(#barGradient)"
            radius={[4, 4, 0, 0]}
            name="Participações"
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

// Gráfico de Distribuição de Jogadores
export function DistribuicaoJogadoresChart() {
  const { data, loading, error } = useChartData(
    dashboardService.getDistribuicaoJogadores
  );

  if (loading) {
    return (
      <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#f59e0b' }} />
      </Box>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <Alert severity="warning" sx={{ bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
        {error || 'Nenhum dado disponível'}
      </Alert>
    );
  }

  return (
    <Box sx={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}

// Gráfico de Ranking Médio por Torneio
export function RankingMedioTorneioChart() {
  const { data, loading, error } = useChartData(
    dashboardService.getRankingMedioTorneio
  );

  if (loading) {
    return (
      <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#f59e0b' }} />
      </Box>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <Alert severity="warning" sx={{ bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
        {error || 'Nenhum dado disponível'}
      </Alert>
    );
  }

  return (
    <Box sx={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(245, 158, 11, 0.1)" />
          <XAxis 
            dataKey="torneio" 
            stroke="rgba(255, 255, 255, 0.7)"
            fontSize={11}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="rgba(255, 255, 255, 0.7)"
            fontSize={12}
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <Box
                    sx={{
                      background: 'rgba(30, 30, 30, 0.95)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: 2,
                      p: 2
                    }}
                  >
                    <Typography variant="body2" sx={{ color: '#f59e0b', mb: 1, fontWeight: 600 }}>
                      {label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#22c55e' }}>
                      Média: {data.mediaPontos} pontos
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#3b82f6' }}>
                      Participantes: {data.participantes}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Data: {data.data}
                    </Typography>
                  </Box>
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey="mediaPontos" 
            fill="url(#rankingGradient)"
            radius={[4, 4, 0, 0]}
            name="Média de Pontos"
          />
          <defs>
            <linearGradient id="rankingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

// Gráfico de Evolução do Ranking
export function EvolucaoRankingChart() {
  const { data, loading, error } = useChartData(
    dashboardService.getEvolucaoRanking
  );

  if (loading) {
    return (
      <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#f59e0b' }} />
      </Box>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <Alert severity="warning" sx={{ bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
        {error || 'Nenhum dado disponível'}
      </Alert>
    );
  }

  // Extrair nomes dos jogadores dinamicamente (excluindo 'mes')
  const jogadores = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'mes') : [];
  const cores = ['#f59e0b', '#22c55e', '#3b82f6', '#ef4444', '#8b5cf6'];

  return (
    <Box sx={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(245, 158, 11, 0.1)" />
          <XAxis 
            dataKey="mes" 
            stroke="rgba(255, 255, 255, 0.7)"
            fontSize={12}
          />
          <YAxis 
            stroke="rgba(255, 255, 255, 0.7)"
            fontSize={12}
            domain={[1, 3]}
            reversed
          />
          <Tooltip content={<CustomTooltip />} />
          {jogadores.map((jogador, index) => (
            <Area
              key={jogador}
              type="monotone"
              dataKey={jogador}
              stroke={cores[index % cores.length]}
              fill={`${cores[index % cores.length]}20`}
              name={jogador}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
