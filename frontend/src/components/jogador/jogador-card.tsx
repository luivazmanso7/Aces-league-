'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Chip,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  EmojiEvents as TrophyIcon,
  Stars as StarsIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

import type { Jogador } from '@/types/jogador';
import { jogadorService } from '@/services/jogador.service';

interface JogadorCardProps {
  jogador: Jogador;
  onEdit: (jogador: Jogador) => void;
  onDelete: (jogador: Jogador) => void;
  onViewDetails: (jogador: Jogador) => void;
}

export default function JogadorCard({ jogador, onEdit, onDelete, onViewDetails }: JogadorCardProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(jogador);
    handleClose();
  };

  const handleDelete = () => {
    onDelete(jogador);
    handleClose();
  };

  const handleViewDetails = () => {
    onViewDetails(jogador);
    handleClose();
  };

  const statusBadge = jogadorService.getStatusBadge(jogador);
  const idade = jogadorService.calcularIdade(jogador.data_nascimento);
  const percentualVitorias = jogador.total_torneios > 0 
    ? Math.round((jogador.vitorias / jogador.total_torneios) * 100) 
    : 0;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
        bgcolor: '#222',
        color: '#fff',
        border: '1px solid #333',
      }}
    >
      {/* Menu de ações */}
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
        <IconButton
          aria-label="more"
          id="jogador-menu-button"
          aria-controls={open ? 'jogador-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          size="small"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="jogador-menu"
          MenuListProps={{
            'aria-labelledby': 'jogador-menu-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleViewDetails}>
            <PersonIcon sx={{ mr: 1 }} fontSize="small" />
            Ver Detalhes
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <EditIcon sx={{ mr: 1 }} fontSize="small" />
            Editar
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
            Excluir
          </MenuItem>
        </Menu>
      </Box>

      <CardContent sx={{ flex: 1, pb: 1, color: '#fff' }}>
        {/* Header com avatar e informações básicas */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{ 
              width: 56, 
              height: 56, 
              mr: 2,
              bgcolor: 'primary.main'
            }}
          >
            {jogador.nome.charAt(0).toUpperCase()}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 0.5, color: '#fff' }}>
              {jogador.nome}
            </Typography>
            
            {jogador.apelido && (
              <Typography variant="body2" color="#ccc" sx={{ mb: 0.5 }}>
                &quot;{jogador.apelido}&quot;
              </Typography>
            )}

            <Chip
              label={statusBadge.label}
              size="small"
              color={statusBadge.color}
              sx={{ fontSize: '0.75rem' }}
            />
          </Box>
        </Box>

        {/* Informações de contato */}
        <Stack spacing={0.5} sx={{ mb: 2, color: '#fff' }}>
          {jogador.email && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" color="#ccc" sx={{ fontSize: '0.85rem' }}>
                {jogador.email}
              </Typography>
            </Box>
          )}
          
          {jogador.telefone && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" color="#ccc" sx={{ fontSize: '0.85rem' }}>
                {jogadorService.formatTelefone(jogador.telefone)}
              </Typography>
            </Box>
          )}
          
          {jogador.cidade && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" color="#ccc" sx={{ fontSize: '0.85rem' }}>
                {jogador.cidade}
                {idade && ` • ${idade} anos`}
              </Typography>
            </Box>
          )}
        </Stack>

        {/* Estatísticas */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 1,
          p: 1.5,
          bgcolor: '#333',
          borderRadius: 1,
          mb: 1,
          color: '#fff',
        }}>
          <Tooltip title="Total de Torneios">
            <Box sx={{ textAlign: 'center' }}>
              <TrendingUpIcon sx={{ fontSize: 20, color: '#fff', mb: 0.5 }} />
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff' }}>
                {jogador.total_torneios}
              </Typography>
              <Typography variant="caption" sx={{ color: '#ccc' }}>
                Torneios
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Vitórias">
            <Box sx={{ textAlign: 'center' }}>
              <TrophyIcon sx={{ fontSize: 20, color: 'success.main', mb: 0.5 }} />
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff' }}>
                {jogador.vitorias}
              </Typography>
              <Typography variant="caption" sx={{ color: '#ccc' }}>
                Vitórias
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Total de Pontos">
            <Box sx={{ textAlign: 'center' }}>
              <StarsIcon sx={{ fontSize: 20, color: 'warning.main', mb: 0.5 }} />
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff' }}>
                {jogador.total_pontos.toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ color: '#ccc' }}>
                Pontos
              </Typography>
            </Box>
          </Tooltip>
        </Box>

        {/* Estatísticas adicionais */}
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
          {jogador.melhor_posicao && (
            <Chip
              label={`Melhor: ${jogador.melhor_posicao}º`}
              size="small"
              variant="outlined"
              color="primary"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
          
          {percentualVitorias > 0 && (
            <Chip
              label={`${percentualVitorias}% vitórias`}
              size="small"
              variant="outlined"
              color="success"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
        </Stack>
      </CardContent>

      <CardActions sx={{ pt: 0, justifyContent: 'space-between', color: '#fff' }}>
        <Typography variant="caption" sx={{ color: '#ccc' }}>
          Cadastro: {jogadorService.formatDataCadastro(jogador.criado_em)}
        </Typography>
        
        <Button
          size="small"
          variant="outlined"
          onClick={() => onViewDetails(jogador)}
          sx={{ color: '#fff', borderColor: '#fff', '&:hover': { borderColor: '#eab308', color: '#eab308', background: 'rgba(234,179,8,0.08)' } }}
        >
          Ver Perfil
        </Button>
      </CardActions>
    </Card>
  );
}
