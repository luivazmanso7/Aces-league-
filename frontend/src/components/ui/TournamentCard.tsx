'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  LinearProgress,
  Stack,
  Divider
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  Schedule as ScheduleIcon,
  LocationOn as MapPinIcon,
  AttachMoney as DollarSignIcon,
  People as UsersIcon,
  EmojiEvents as TrophyIcon
} from '@mui/icons-material';
import { openWhatsAppForTournament } from '@/utils/whatsapp';

interface Tournament {
  id: number;
  nome: string;
  dataInicio: string;
  local: {
    nome: string;
  };
  preco?: number;
  descricao?: string;
  vagas?: number;
  inscritos?: number;
  status?: 'upcoming' | 'ongoing' | 'completed';
}

interface TournamentCardProps {
  tournament: Tournament;
  onRegister?: () => void;
  onViewDetails?: () => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ 
  tournament, 
  onRegister,

}) => {
  const getStatusColor = (status: string = 'upcoming') => {
    switch (status) {
      case 'upcoming': return { bgcolor: '#dbeafe', color: '#1e40af' };
      case 'ongoing': return { bgcolor: '#dcfce7', color: '#166534' };
      case 'completed': return { bgcolor: '#f5f5f4', color: '#57534e' };
      default: return { bgcolor: '#f5f5f4', color: '#57534e' };
    }
  };

  const getStatusText = (status: string = 'upcoming') => {
    switch (status) {
      case 'upcoming': return 'Próximo';
      case 'ongoing': return 'Ao Vivo';
      case 'completed': return 'Finalizado';
      default: return 'Agendado';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const participationPercentage = tournament.vagas && tournament.inscritos 
    ? Math.round((tournament.inscritos / tournament.vagas) * 100)
    : 0;

  const statusColors = getStatusColor(tournament.status);

  return (
    <Card
      sx={{
        borderRadius: 4,
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(234, 179, 8, 0.2)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(234, 179, 8, 0.3)',
          borderColor: '#eab308'
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, #eab308, #facc15, #ca8a04)',
          zIndex: 2
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.92)',
          zIndex: 1
        }
      }}
    >
      <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <TrophyIcon sx={{ color: '#eab308', fontSize: '1.5rem' }} />
              <Chip
                label={getStatusText(tournament.status)}
                size="small"
                sx={{
                  bgcolor: statusColors.bgcolor,
                  color: statusColors.color,
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: '#1c1917',
                mb: 1,
                fontSize: '1.5rem',
                lineHeight: 1.2
              }}
            >
              {tournament.nome}
            </Typography>
          </Box>
        </Box>

        {/* Tournament Details */}
        <Stack spacing={2.5} sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CalendarIcon sx={{ color: '#eab308', fontSize: '1.25rem' }} />
            <Typography variant="body2" sx={{ color: '#57534e', fontSize: '0.95rem' }}>
              {formatDate(tournament.dataInicio)}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ScheduleIcon sx={{ color: '#eab308', fontSize: '1.25rem' }} />
            <Typography variant="body2" sx={{ color: '#57534e', fontSize: '0.95rem' }}>
              {formatTime(tournament.dataInicio)}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <MapPinIcon sx={{ color: '#eab308', fontSize: '1.25rem' }} />
            <Typography variant="body2" sx={{ color: '#57534e', fontSize: '0.95rem' }}>
              {tournament.local?.nome || 'Local a definir'}
            </Typography>
          </Box>
          
          {tournament.preco && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <DollarSignIcon sx={{ color: '#eab308', fontSize: '1.25rem' }} />
              <Typography variant="body2" sx={{ color: '#57534e', fontSize: '0.95rem' }}>
                Buy-in: R$ {tournament.preco.toFixed(2)}
              </Typography>
            </Box>
          )}
          
          {tournament.vagas && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <UsersIcon sx={{ color: '#eab308', fontSize: '1.25rem' }} />
              <Typography variant="body2" sx={{ color: '#57534e', fontSize: '0.95rem' }}>
                {tournament.inscritos || 0}/{tournament.vagas} participantes
              </Typography>
            </Box>
          )}
        </Stack>

        {/* Progress Bar */}
        {tournament.vagas && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" sx={{ color: '#78716c', fontSize: '0.75rem' }}>
                Participantes
              </Typography>
              <Typography variant="caption" sx={{ color: '#78716c', fontSize: '0.75rem' }}>
                {participationPercentage}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={participationPercentage}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: '#e7e5e4',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #eab308, #facc15)',
                  borderRadius: 4
                }
              }}
            />
          </Box>
        )}

        {/* Description */}
        {tournament.descricao && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography
              variant="body2"
              sx={{
                color: '#57534e',
                lineHeight: 1.6,
                mb: 3,
                fontSize: '0.9rem'
              }}
            >
              {tournament.descricao}
            </Typography>
          </>
        )}

        {/* Actions */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              if (tournament.status === 'completed') {
                onRegister?.();
              } else {
                openWhatsAppForTournament(tournament.nome);
              }
            }}
            sx={{
              background: tournament.status === 'completed' 
                ? 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)'
                : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: 'white',
              fontWeight: 600,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
              '&:hover': {
                background: tournament.status === 'completed'
                  ? 'linear-gradient(135deg, #4b5563 0%, #6b7280 100%)'
                  : 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(34, 197, 94, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {tournament.status === 'completed' ? 'Ver Resultados' : 'Inscrever-se'}
          </Button>
          
         
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TournamentCard;
