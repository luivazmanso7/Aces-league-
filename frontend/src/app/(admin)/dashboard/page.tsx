'use client';

import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  LinearProgress,
} from '@mui/material';
import { dashboardService } from '@/services/dashboard.service';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  
  // Carregar dados reais do gráfico de participações por mês
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dashboardService.getParticipacoesPorMes();
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        className="animate-fadeInUp"
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.8) 0%, rgba(42, 42, 42, 0.8) 100%)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: 3,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600,
              }}
            >
              Carregando ACES POKER Dashboard...
            </Typography>
          </Box>
          <LinearProgress
            sx={{
              width: 250,
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(135deg, #7c2d12 0%, #f59e0b 100%)',
                borderRadius: 3,
              },
            }}
          />
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }} className="animate-fadeInUp">
      {/* Header */}
      <Box mb={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #7c2d12 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Dashboard ACES POKER
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 500,
          }}
        >
          Painel de Controle Administrativo
        </Typography>
      </Box>

      {/* Bloco de boas-vindas removido conforme solicitado */}

    </Box>
  );
}
