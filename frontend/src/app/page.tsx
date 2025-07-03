'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Stack,
  Paper,
  CircularProgress,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar
} from '@mui/material'
import {
  PlayArrow as PlayIcon,
  EmojiEvents as TrophyIcon,
  People as PeopleIcon,
  AdminPanelSettings as AdminIcon,
  Star as StarIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  ArrowUpward as ArrowUpIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  Info as InfoIcon,
  Schedule as ScheduleIcon,
  Stars as ExcellenceIcon,
  Diversity3 as CommunityIcon,
  Verified as IntegrityIcon
} from '@mui/icons-material'
import { PublicApiService } from '@/services/publicApi'
import { temporadaApi } from '@/services/temporada.service'
import { ProximoTorneio } from '@/types/landing'
import { Ranking } from '@/types/temporada'
import { Logo } from '@/components/ui/Logo'
import TournamentCard from '@/components/ui/TournamentCard'
import { openWhatsAppForTournament } from '@/utils/whatsapp'

export default function LandingPage() {
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentSeasonRanking, setCurrentSeasonRanking] = useState<Ranking[]>([])
  const [proximoTorneio, setProximoTorneio] = useState<ProximoTorneio | null>(null)

  // Detectar scroll para mudar aparência do header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true)
        const [currentSeasonData, torneioData] = await Promise.all([
          temporadaApi.getTop10CurrentSeason(),
          PublicApiService.getProximoTorneio()
        ])

        setCurrentSeasonRanking(currentSeasonData) // Top 10 da temporada atual
        setProximoTorneio(torneioData)
        
        // Debug: Log dos dados carregados
        console.log('Dados carregados:', {
          ranking: currentSeasonData,
          torneio: torneioData
        })
      } catch (error) {
        console.error('Erro ao carregar dados da landing page:', error)
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [])

  // Função para navegação suave
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileMenuOpen(false)
  }

  // Função para voltar ao topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <Box 
        sx={{
          minHeight: '100vh', 
          bgcolor: '#ffffff', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ color: '#eab308', mb: 2 }} size={60} />
          <Typography variant="h6" sx={{ color: '#1c1917' }}>
            Carregando...
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff' }}>
      {/* Header Aprimorado */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          bgcolor: scrolled 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled 
            ? '1px solid rgba(234, 179, 8, 0.3)' 
            : '1px solid rgba(234, 179, 8, 0.15)',
          transition: 'all 0.3s ease',
          transform: scrolled ? 'translateY(0)' : 'translateY(0)',
          boxShadow: scrolled 
            ? '0 4px 20px rgba(0, 0, 0, 0.08)' 
            : '0 2px 10px rgba(0, 0, 0, 0.04)'
        }}
      >
        <Toolbar sx={{ py: scrolled ? 1.2 : 1.2, transition: 'all 0.3s ease' }}>
          {/* Logo e Nome */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexGrow: 1,
              cursor: 'pointer'
            }}
            onClick={scrollToTop}
          >
            <Logo 
              variant="full"
              size={55}
              color="dark"
              showText={true}
            />
          </Box>
          
          {/* Menu Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
            <Button 
              onClick={() => scrollToSection('torneios')}
              sx={{ 
                color: '#333',
                fontWeight: 600,
                px: 3,
                py: 1,
                fontSize: '1rem',
                borderRadius: 2,
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#eab308',
                  transform: 'translateY(-2px)',
                  '&::after': {
                    width: '100%'
                  }
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: '2px',
                  bgcolor: '#eab308',
                  transition: 'width 0.3s ease'
                }
              }}
            >
              Torneios
            </Button>
            
            <Button 
              onClick={() => scrollToSection('ranking')}
              sx={{ 
                color: '#333',
                fontWeight: 600,
                px: 3,
                py: 1,
                fontSize: '1rem',
                borderRadius: 2,
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#eab308',
                  transform: 'translateY(-2px)',
                  '&::after': {
                    width: '100%'
                  }
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: '2px',
                  bgcolor: '#eab308',
                  transition: 'width 0.3s ease'
                }
              }}
            >
              Ranking
            </Button>
            
            <Button 
              onClick={() => scrollToSection('sobre')}
              sx={{ 
                color: '#333',
                fontWeight: 600,
                px: 3,
                py: 1,
                fontSize: '1rem',
                borderRadius: 2,
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#eab308',
                  transform: 'translateY(-2px)',
                  '&::after': {
                    width: '100%'
                  }
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: '2px',
                  bgcolor: '#eab308',
                  transition: 'width 0.3s ease'
                }
              }}
            >
              Sobre
            </Button>
          </Box>

          {/* Menu Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ 
                color: '#ca8a04',
                '&:hover': {
                  bgcolor: 'rgba(234, 179, 8, 0.1)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menu Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            bgcolor: '#ffffff',
            color: '#1c1917',
            borderLeft: '1px solid rgba(234, 179, 8, 0.2)',
            width: 280
          }
        }}
      >
        <Box sx={{ pt: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 3 }}>
            <Logo 
              variant="icon"
              size={30}
              color="gold"
              showText={false}
            />
            <IconButton 
              onClick={() => setMobileMenuOpen(false)}
              sx={{ color: '#eab308' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List>
            <ListItem onClick={() => scrollToSection('torneios')}>
              <ListItemIcon>
                <TrophyIcon sx={{ color: '#eab308' }} />
              </ListItemIcon>
              <ListItemText primary="Torneios" />
            </ListItem>
            
            <ListItem onClick={() => scrollToSection('ranking')}>
              <ListItemIcon>
                <StarIcon sx={{ color: '#eab308' }} />
              </ListItemIcon>
              <ListItemText primary="Ranking" />
            </ListItem>
            
            <ListItem onClick={() => scrollToSection('sobre')}>
              <ListItemIcon>
                <PlayIcon sx={{ color: '#eab308' }} />
              </ListItemIcon>
              <ListItemText primary="Sobre" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Botão Voltar ao Topo */}
      {scrolled && (
        <Fab
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            bgcolor: '#eab308',
            color: '#fff',
            zIndex: 1000,
            '&:hover': {
              bgcolor: '#facc15',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <ArrowUpIcon />
        </Fab>
      )}

      {/* Hero Section - Dark Premium Design */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
          pt: 8,
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
              opacity: 1
            },
            '50%': {
              transform: 'scale(1.2)',
              opacity: 0.7
            },
            '100%': {
              transform: 'scale(1)',
              opacity: 1
            }
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('/images/poker-hero.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.08,
            zIndex: 0
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.1) 0%, transparent 70%)',
            zIndex: 0
          }
        }}
      >
        {/* Elementos decorativos de poker */}
        <Box sx={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: '80px',
          height: '80px',
          opacity: 0.1,
          zIndex: 0,
          fontSize: '4rem'
        }}>
          ♠️
        </Box>
        <Box sx={{
          position: 'absolute',
          top: '70%',
          right: '10%',
          width: '60px',
          height: '60px',
          opacity: 0.1,
          zIndex: 0,
          fontSize: '3rem'
        }}>
          ♥️
        </Box>
        <Box sx={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          width: '50px',
          height: '50px',
          opacity: 0.1,
          zIndex: 0,
          fontSize: '2.5rem'
        }}>
          ♦️
        </Box>
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ 
            textAlign: 'center',
            color: 'white',
            mb: 8
          }}>
            {/* Título Principal */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '4rem', sm: '5rem', md: '6rem' },
                fontWeight: 900,
                mb: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-2px',
                lineHeight: 0.9,
                textShadow: '0 0 30px rgba(255, 255, 255, 0.1)'
              }}
            >
              ACES LEAGUE
            </Typography>
            
            {/* Subtítulo */}
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 6,
                lineHeight: 1.6,
                maxWidth: '800px',
                margin: '0 auto 3rem auto',
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 400
              }}
            >
              Onde lendas nascem e campeões se destacam. Junte-se aos torneios de poker mais prestigiosos da região.
            </Typography>

            {/* Estatísticas em Destaque */}
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: { xs: 4, md: 8 },
              mb: 8,
              maxWidth: '800px',
              mx: 'auto'
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9rem',
                    mb: 1,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  Experiência
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 900,
                    color: '#fbbf24',
                    textShadow: '0 0 20px rgba(251, 191, 36, 0.4)'
                  }}
                >
                  VIP
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9rem',
                    mb: 1,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  Ambiente
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 900,
                    color: '#fbbf24',
                    textShadow: '0 0 20px rgba(251, 191, 36, 0.4)'
                  }}
                >
                  PRO
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9rem',
                    mb: 1,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  Transmissões
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 900,
                    color: '#fbbf24',
                    textShadow: '0 0 20px rgba(251, 191, 36, 0.4)'
                  }}
                >
                  LIVE
                </Typography>
              </Box>
            </Box>

            {/* Botões de Ação */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              justifyContent="center"
              sx={{ mb: 4 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayIcon />}
                onClick={() => scrollToSection('torneios')}
                sx={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  color: '#1a1a1a',
                  fontWeight: 700,
                  px: 6,
                  py: 2.5,
                  fontSize: '1.1rem',
                  borderRadius: '12px',
                  textTransform: 'none',
                  boxShadow: '0 8px 25px rgba(251, 191, 36, 0.4)',
                  border: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 35px rgba(251, 191, 36, 0.5)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Participar do Próximo Torneio
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                startIcon={<TrophyIcon />}
                onClick={() => scrollToSection('ranking')}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  fontWeight: 600,
                  px: 6,
                  py: 2.5,
                  fontSize: '1.1rem',
                  borderRadius: '12px',
                  textTransform: 'none',
                  borderWidth: '2px',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-3px)',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    borderWidth: '2px'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Ver Classificação
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Welcome Section Redesigned */}
      <Box sx={{ 
        py: 10, 
        background: 'linear-gradient(180deg, rgba(248, 250, 252, 1) 0%, rgba(241, 245, 249, 1) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                color: '#1c1917',
                fontWeight: 'bold',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #111827 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Bem-vindo à Elite do Poker
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: '#57534e',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: 1.8,
                mb: 6,
                fontSize: '1.2rem',
                fontWeight: 400
              }}
            >
              Experimente torneios de alto nível, eventos exclusivos e uma comunidade 
              apaixonada pelos jogos de cartas mais estratégicos do mundo.
            </Typography>
          </Box>

          {/* Showcase Visual com Imagem do Poker */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 6,
            alignItems: 'center',
            mt: 8
          }}>
            {/* Lado esquerdo - Conteúdo */}
            <Box>
              <Typography
                variant="h3"
                sx={{
                  color: '#1c1917',
                  fontWeight: 'bold',
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Experiência{' '}
                <Box component="span" sx={{ color: '#eab308' }}>
                  Autêntica
                </Box>
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: '#57534e',
                  mb: 4,
                  lineHeight: 1.8,
                  fontSize: '1.1rem'
                }}
              >
                Na ACES LEAGUE, cada jogo é uma oportunidade de demonstrar suas habilidades. 
                Com fichas profissionais, cartas premium e um ambiente que respira poker, 
                oferecemos a experiência mais autêntica do Brasil.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                {[
                  { icon: <TrophyIcon />, title: 'Torneios Regulares', desc: 'Eventos todas as semanas', color: '#eab308' },
                  { icon: <StarIcon />, title: 'Rankings Oficiais', desc: 'Sistema de pontuação profissional', color: '#3b82f6' },
                  { icon: <PeopleIcon />, title: 'Network Exclusivo', desc: 'Conecte-se com a elite', color: '#a855f7' }
                ].map((item, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 3,
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                      bgcolor: 'rgba(255, 255, 255, 0.95)'
                    }
                  }}>
                    <Box sx={{ 
                      color: item.color,
                      bgcolor: `rgba(${item.color === '#eab308' ? '234, 179, 8' : item.color === '#3b82f6' ? '59, 130, 246' : '168, 85, 247'}, 0.15)`,
                      p: 2.5,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '56px',
                      minHeight: '56px'
                    }}>
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#1c1917', fontWeight: 'bold', mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#57534e' }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              
            </Box>

            {/* Lado direito - Imagem do poker em destaque */}
            <Box sx={{ 
              position: 'relative',
              height: '500px',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%)'
            }}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url('images/PHOTO-2025-06-30-12-16-16.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  filter: 'brightness(1.1) contrast(1.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    filter: 'brightness(1.2) contrast(1.2)'
                  }
                }}
              />
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(234, 179, 8, 0.1) 0%, transparent 50%, rgba(250, 204, 21, 0.05) 100%)'
              }} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Próximo Torneio - Redesigned */}
      <Box 
        id="torneios" 
        sx={{ 
          py: 10,
          background:'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('/images/poker-chips.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.08,
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                textShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }}
            >
              Próximo Torneio
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.2rem',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              Participe do próximo evento e mostre suas habilidades
            </Typography>
          </Box>
          
          {/* Tournament Card */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            maxWidth: '600px',
            mx: 'auto'
          }}>
            {proximoTorneio ? (
              <TournamentCard
                tournament={{
                  ...proximoTorneio,
                  local: proximoTorneio.local || { nome: 'Local a definir' }
                }}
                onRegister={() => {
                  console.log('Inscrever no torneio:', proximoTorneio.id);
                  // Aqui você pode adicionar a lógica de inscrição
                }}
                onViewDetails={() => {
                  console.log('Ver detalhes do torneio:', proximoTorneio.id);
                  // Aqui você pode adicionar a lógica para mostrar detalhes
                }}
              />
            ) : (
              <Paper
                elevation={0}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 6,
                  p: { xs: 4, md: 6 },
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                  width: '100%',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'linear-gradient(90deg, #eab308, #facc15, #ca8a04)'
                  }
                }}
              >
                <ScheduleIcon 
                  sx={{ 
                    fontSize: '4rem', 
                    color: '#eab308', 
                    mb: 3,
                    opacity: 0.8
                  }} 
                />
                
                <Typography
                  variant="h3"
                  sx={{
                    color: '#1c1917',
                    fontWeight: 'bold',
                    mb: 3,
                    fontSize: { xs: '2rem', md: '2.5rem' }
                  }}
                >
                  Novos Torneios em Breve!
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: '#57534e',
                    mb: 4,
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                    maxWidth: '500px',
                    mx: 'auto'
                  }}
                >
                  Estamos organizando os próximos torneios da ACES LEAGUE com estruturas 
                  profissionais e prêmios incríveis. Entre em contato para receber informações 
                  em primeira mão sobre as próximas datas!
                </Typography>
                
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={3} 
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PhoneIcon />}
                    onClick={() => openWhatsAppForTournament()}
                    sx={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                      color: '#1a1a1a',
                      px: 6,
                      py: 2.5,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      borderRadius: '12px',
                      textTransform: 'none',
                      boxShadow: '0 8px 25px rgba(251, 191, 36, 0.4)',
                      border: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 35px rgba(251, 191, 36, 0.5)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Receber Informações
                  </Button>
                  
                </Stack>
                
                
              </Paper>
            )}
          </Box>
        </Container>
      </Box>

      {/* Ranking Section - Minimalist Table Design */}
      <Box id="ranking" sx={{ 
        py: 10, 
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                color: '#1e293b',
                fontWeight: 'bold',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <TrophyIcon sx={{ color: '#eab308', fontSize: { xs: '2.5rem', md: '3.5rem' } }} />
              Ranking Atual
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: '#64748b',
                fontSize: '1.1rem',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              Top 10 jogadores da temporada atual
            </Typography>
          </Box>
          
          {/* Ranking Table - Clean & Professional Design */}
          {currentSeasonRanking.length === 0 ? (
            // Empty State - No Ranking Available
            <Box sx={{ 
              maxWidth: '600px', 
              mx: 'auto',
              textAlign: 'center'
            }}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: 'white',
                  border: '2px solid rgba(234, 179, 8, 0.2)',
                  borderRadius: 6,
                  p: { xs: 4, md: 6 },
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'linear-gradient(90deg, #eab308, #facc15, #ca8a04)'
                  }
                }}
              >
               
                
               
                
                <Typography
                  variant="body1"
                  sx={{
                    color: '#64748b',
                    mb: 4,
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                    maxWidth: '450px',
                    mx: 'auto'
                  }}
                >
                  O ranking será atualizado após os primeiros torneios da temporada. 
                  Seja um dos primeiros a marcar seu nome na história da ACES LEAGUE!
                </Typography>
                
                
                
                <Box sx={{ 
                  mt: 5, 
                  p: 3, 
                  borderRadius: 3,
                  bgcolor: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2
                }}>
                  <InfoIcon sx={{ color: '#1e40af', fontSize: '1.2rem', mt: 0.1 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#1e40af',
                      fontSize: '0.9rem',
                      lineHeight: 1.5
                    }}
                  >
                    O ranking é atualizado após cada torneio com base no desempenho dos jogadores. 
                    Participe dos torneios para começar a acumular pontos!
                  </Typography>
                </Box> 
              </Paper>
            </Box>
          ) : (
            // Existing Ranking Table
            <Box sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              bgcolor: 'white',
              borderRadius: 3,
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              overflow: 'hidden'
            }}>
              <Table sx={{ 
                '& .MuiTableCell-root': { 
                  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                  fontSize: '0.95rem'
                }
              }}>
                <TableHead>
                  <TableRow sx={{ 
                    bgcolor: '#fafafa',
                    '& .MuiTableCell-head': {
                      fontWeight: 600,
                      color: '#2d3748',
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }
                  }}>
                    <TableCell sx={{ width: '80px', textAlign: 'center' }}>
                      #
                    </TableCell>
                    <TableCell>
                      Jogador
                    </TableCell>
                    <TableCell align="center" sx={{ width: '120px' }}>
                      Pontos
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentSeasonRanking.slice(0, 10).map((jogador, index) => {
                    const posicao = index + 1;
                    const isPodium = posicao <= 3;

                    return (
                      <TableRow
                        key={jogador.id || index}
                        sx={{
                          '&:hover': {
                            bgcolor: '#f8fafc',
                          },
                          '&:last-child .MuiTableCell-root': {
                            borderBottom: 'none'
                          }
                        }}
                      >
                        <TableCell align="center" sx={{ 
                          fontWeight: 'bold',
                          color: isPodium ? '#eab308' : '#64748b',
                          fontSize: isPodium ? '1.1rem' : '1rem'
                        }}>
                          {posicao}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: isPodium ? '#eab308' : '#94a3b8',
                                fontSize: '1rem',
                                fontWeight: 600
                              }}
                            >
                              {(jogador.jogador?.nome || 'J').charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  fontWeight: 600, 
                                  color: '#1e293b',
                                  lineHeight: 1.2
                                }}
                              >
                                {jogador.jogador?.nome || 'Jogador Anônimo'}
                              </Typography>
                              {jogador.jogador?.apelido && (
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    color: '#64748b',
                                    fontSize: '0.8rem',
                                    fontStyle: 'italic'
                                  }}
                                >
                                  &ldquo;{jogador.jogador.apelido}&rdquo;
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontWeight: 600, 
                              color: isPodium ? '#eab308' : '#1e293b',
                              fontSize: isPodium ? '1.05rem' : '0.95rem'
                            }}
                          >
                            {jogador.pontuacao?.toLocaleString() || 0}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          )}

          {/* Call to Action */}
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography
              variant="h5"
              sx={{
                color: '#1e293b',
                fontWeight: 'bold',
                mb: 3,
                fontSize: { xs: '1.5rem', md: '1.8rem' }
              }}
            >
              Quer estar no topo do ranking?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Participe dos nossos torneios e acumule pontos para subir no ranking. 
              Cada torneio é uma nova oportunidade de mostrar suas habilidades!
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayIcon />}
              onClick={() => scrollToSection('torneios')}
              sx={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#1a1a1a',
                px: 6,
                py: 2.5,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '12px',
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(251, 191, 36, 0.4)',
                border: 'none',
                '&:hover': {
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 35px rgba(251, 191, 36, 0.5)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Participar do Próximo Torneio
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Sobre Section - Light Theme */}
      <Box id="sobre" sx={{ 
        py: 10,
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 249, 1) 100%)',
        position: 'relative'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                color: '#1e293b',
                fontWeight: 'bold',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <InfoIcon sx={{ color: '#eab308', fontSize: { xs: '2.5rem', md: '3.5rem' } }} />
              Sobre a ACES LEAGUE
            </Typography>
            
            
          </Box>

          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 8,
            alignItems: 'center',
            mb: 8
          }}>
            {/* Lado esquerdo - História */}
            <Box>
              <Typography
                variant="h3"
                sx={{
                  color: '#1c1917',
                  fontWeight: 'bold',
                  mb: 4,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Nossa{' '}
                <Box component="span" sx={{ color: '#eab308' }}>
                  História
                </Box>
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: '#57534e',
                  mb: 4,
                  lineHeight: 1.8,
                  fontSize: '1.1rem'
                }}
              >
                Fundada em 2021, a ACES LEAGUE nasceu da paixão de um grupo de amigos 
                pelo poker. O que começou como encontros casuais evoluiu para o principal 
                clube de poker do Brasil, reunindo centenas de jogadores apaixonados.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#57534e',
                  mb: 4,
                  lineHeight: 1.8,
                  fontSize: '1.1rem'
                }}
              >
                Nossa missão é proporcionar uma experiência autêntica e profissional, 
                mantendo sempre o espírito de camaradagem e fair play que nos define.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { 
                    title: 'Excelência', 
                    desc: 'Torneios com estrutura profissional',
                    icon: <ExcellenceIcon />,
                    color: '#eab308'
                  },
                  { 
                    title: 'Comunidade', 
                    desc: 'Ambiente acolhedor e respeitoso',
                    icon: <CommunityIcon />,
                    color: '#10b981'
                  },
                  { 
                    title: 'Integridade', 
                    desc: 'Fair play e transparência sempre',
                    icon: <IntegrityIcon />,
                    color: '#3b82f6'
                  }
                ].map((value, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ 
                      color: value.color,
                      bgcolor: `${value.color}20`,
                      p: 1.5,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '48px',
                      minHeight: '48px'
                    }}>
                      {value.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#1c1917', fontWeight: 'bold', mb: 0.5 }}>
                        {value.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#57534e' }}>
                        {value.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Lado direito - Logos */}
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              flexWrap: 'wrap'
            }}>
              {/* Logo 1 */}
              <Box sx={{
                width: '200px',
                height: '200px',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                border: '2px solid rgba(234, 179, 8, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'white',
                transition: 'all 0.3s ease',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.15)',
                  borderColor: 'rgba(234, 179, 8, 0.4)'
                }
              }}>
                <Image 
                  src="/logo/image copy.png"
                  alt="ACES LEAGUE Logo"
                  width={180}
                  height={180}
                  style={{
                    objectFit: 'contain'
                  }}
                />
              </Box>

              {/* Logo 2 */}
              <Box sx={{
                width: '200px',
                height: '200px',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                border: '2px solid rgba(234, 179, 8, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'white',
                transition: 'all 0.3s ease',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.15)',
                  borderColor: 'rgba(234, 179, 8, 0.4)'
                }
              }}>
                <Image 
                  src="/logo/PHOTO-2025-06-30-11-34-08.jpg"
                  alt="ACES LEAGUE"
                  width={200}
                  height={200}
                  style={{
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer - Light Theme */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)',
          color: 'white',
          py: 8,
          borderTop: '3px solid #eab308',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 6,
            mb: 6
          }}>
            {/* Logo e Descrição */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Image 
                  src="/logo/image copy.png"
                  alt="ACES LEAGUE"
                  width={50}
                  height={50}
                  style={{
                    objectFit: 'contain'
                  }}
                />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.7,
                  mb: 3
                }}
              >
                A principal liga de poker do Brasil. Junte-se à nossa comunidade 
                e experimente torneios profissionais em um ambiente premium.
              </Typography>
            </Box>

            {/* Links Rápidos */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: '#eab308',
                  fontWeight: 'bold',
                  mb: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                Links Rápidos
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'Próximos Torneios', action: () => scrollToSection('torneios') },
                  { label: 'Rankings', action: () => scrollToSection('ranking') },
                  { label: 'Sobre Nós', action: () => scrollToSection('sobre') }
                ].map((link, index) => (
                  <Button
                    key={index}
                    onClick={link.action}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      p: 1,
                      '&:hover': {
                        color: '#eab308',
                        bgcolor: 'rgba(234, 179, 8, 0.1)'
                      }
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Contato e Informações */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: '#eab308',
                  fontWeight: 'bold',
                  mb: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                Contato
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ color: '#eab308', fontSize: '1.2rem' }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    contato@acesleague.com.br
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ color: '#eab308', fontSize: '1.2rem' }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    (81) 99110-6942
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ color: '#eab308', fontSize: '1.2rem' }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Rua Caraçatuba, 370 - Pina, Recife - PE, Brasil
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  component={Link}
                  href="/login"
                  startIcon={<AdminIcon />}
                  sx={{
                    borderColor: '#eab308',
                    color: '#eab308',
                    mt: 2,
                    borderWidth: '2px',
                    '&:hover': {
                      bgcolor: 'rgba(234, 179, 8, 0.1)',
                      borderColor: '#facc15',
                      borderWidth: '2px'
                    }
                  }}
                >
                  Painel Admin
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Separador */}
          <Box sx={{ 
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.5), transparent)',
            mb: 4
          }} />

          {/* Copyright */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              © 2025 ACES LEAGUE. Todos os direitos reservados.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-end' }, gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)'
                }}
              >
                Jogue com responsabilidade.
              </Typography>
              
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}