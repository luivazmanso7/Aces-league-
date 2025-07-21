'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  Box,
  Chip,
  Paper,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Stars as StarsIcon,
} from '@mui/icons-material';
import { Temporada, Ranking } from '@/types/temporada';

interface RankingDialogProps {
  open: boolean;
  onCloseAction: () => void;
  temporada: Temporada | null;
  ranking: Ranking[];
}

export default function RankingDialog({ open, onCloseAction, temporada, ranking }: RankingDialogProps) {
  if (!temporada) return null;

  const getRankingIcon = (posicao: number) => {
    switch (posicao) {
      case 1:
        return <TrophyIcon sx={{ color: '#FFD700' }} />;
      case 2:
        return <TrophyIcon sx={{ color: '#C0C0C0' }} />;
      case 3:
        return <TrophyIcon sx={{ color: '#CD7F32' }} />;
      default:
        return <StarsIcon sx={{ color: 'action.disabled' }} />;
    }
  };

  const getRankingColor = (posicao: number): 'warning' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' => {
    switch (posicao) {
      case 1:
        return 'warning';
      case 2:
        return 'default';
      case 3:
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={open} onClose={onCloseAction} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TrophyIcon color="primary" />
          <div>
            <Box component="span" sx={{ fontWeight: 'medium', fontSize: '1.125rem', display: 'block' }}>
              Ranking - {temporada.nome}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {temporada.ano} • {ranking.length} jogador{ranking.length !== 1 ? 'es' : ''}
            </Typography>
          </div>
        </Box>
      </DialogTitle>

      <DialogContent>
        {ranking.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Nenhum ranking disponível para esta temporada.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Execute o cálculo de ranking para gerar os resultados.
            </Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} variant="outlined" sx={{ backgroundColor: '#222', boxShadow: 'none', borderRadius: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="80px" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem', background: '#222', border: 'none' }}>Posição</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem', background: '#222', border: 'none' }}>Jogador</TableCell>
                  <TableCell align="right" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem', background: '#222', border: 'none' }}>Pontuação</TableCell>
                  <TableCell align="right" width="140px" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem', background: '#222', border: 'none' }}>Atualizado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ranking.map((item) => (
                  <TableRow key={item.id} sx={{ background: '#222 !important' }}>
                    <TableCell sx={{ color: '#fff' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getRankingIcon(item.posicao)}
                        <Chip
                          label={`${item.posicao}º`}
                          size="small"
                          color={getRankingColor(item.posicao)}
                          variant={item.posicao <= 3 ? 'filled' : 'outlined'}
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#fff' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          alt={item.jogador.nome}
                          sx={{ width: 32, height: 32 }}
                        >
                          {item.jogador.nome.charAt(0).toUpperCase()}
                        </Avatar>
                        <div>
                          <Typography variant="body2" fontWeight="medium" sx={{ color: '#fff' }}>
                            {item.jogador.nome}
                          </Typography>
                          {item.jogador.apelido && (
                            <Typography variant="caption" sx={{ color: '#ccc' }}>
                              &ldquo;{item.jogador.apelido}&rdquo;
                            </Typography>
                          )}
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ color: '#fff' }}>
                      <Typography variant="body2" fontWeight="medium" sx={{ color: '#fff' }}>
                        {item.pontuacao.toLocaleString()} pts
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ color: '#fff' }}>
                      <Typography variant="caption" sx={{ color: '#ccc' }}>
                        {formatDate(item.atualizado_em)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onCloseAction} variant="contained">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}