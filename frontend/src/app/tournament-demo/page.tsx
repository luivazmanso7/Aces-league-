'use client';

import React from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';
import TournamentCard from '@/components/ui/TournamentCard';

// Dados de exemplo para demonstrar o componente
const exampleTournaments = [
  {
    id: 1,
    nome: 'Torneio de Natal 2024',
    dataInicio: '2024-12-20T19:00:00.000Z',
    local: {
      nome: 'Clube Aces Poker - Recife'
    },
    preco: 190.00,
    descricao: 'Torneio especial de fim de ano com estrutura profissional, blinds lentos e prêmios garantidos. Uma oportunidade única para encerrar o ano com chave de ouro!',
    vagas: 50,
    inscritos: 32,
    status: 'upcoming' as const
  },
  {
    id: 2,
    nome: 'Championship Final',
    dataInicio: '2024-12-25T20:30:00.000Z',
    local: {
      nome: 'Arena Poker Premium'
    },
    preco: 350.00,
    descricao: 'Final do campeonato anual com os melhores jogadores da temporada. Prêmio garantido de R$ 50.000!',
    vagas: 30,
    inscritos: 28,
    status: 'ongoing' as const
  },
  {
    id: 3,
    nome: 'Torneio Iniciantes',
    dataInicio: '2024-11-15T18:00:00.000Z',
    local: {
      nome: 'Clube Central'
    },
    preco: 75.00,
    descricao: 'Torneio voltado para jogadores iniciantes e intermediários. Ambiente acolhedor e didático.',
    vagas: 40,
    inscritos: 40,
    status: 'completed' as const
  }
];

export default function TournamentCardsDemo() {
  const handleRegister = (tournamentId: number) => {
    console.log('Registrar no torneio:', tournamentId);
    alert(`Inscrição realizada no torneio ${tournamentId}!`);
  };

  const handleViewDetails = (tournamentId: number) => {
    console.log('Ver detalhes do torneio:', tournamentId);
    alert(`Visualizando detalhes do torneio ${tournamentId}`);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f8fafc',
      py: 8
    }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 2,
            fontWeight: 'bold',
            color: '#1e293b',
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Componente TournamentCard
        </Typography>
        
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 8,
            color: '#64748b',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Demonstração do componente de card de torneio com diferentes estados e informações
        </Typography>

        <Stack spacing={6}>
          {exampleTournaments.map((tournament) => (
            <Box 
              key={tournament.id}
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                maxWidth: '600px',
                mx: 'auto',
                width: '100%'
              }}
            >
              <TournamentCard
                tournament={tournament}
                onRegister={() => handleRegister(tournament.id)}
                onViewDetails={() => handleViewDetails(tournament.id)}
              />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
