'use client';

import {
  Typography,
  Box,
} from '@mui/material';

export default function DashboardPage() {
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
