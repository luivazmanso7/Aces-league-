'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
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
  Avatar,
  Chip
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
  PhotoCamera as PhotoCameraIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  Info as InfoIcon
} from '@mui/icons-material'
import { PublicApiService } from '@/services/publicApi'
import { temporadaApi } from '@/services/temporada.service'
import { ProximoTorneio, Foto } from '@/types/landing'
import { Ranking } from '@/types/temporada'
import { Logo } from '@/components/ui/Logo'
import TournamentCard from '@/components/ui/TournamentCard'

export default function LandingPage() {
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentSeasonRanking, setCurrentSeasonRanking] = useState<Ranking[]>([])
  const [proximoTorneio, setProximoTorneio] = useState<ProximoTorneio | null>(null)
  const [fotos, setFotos] = useState<Foto[]>([])

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
        const [currentSeasonData, torneioData, fotosData] = await Promise.all([
          temporadaApi.getTop10CurrentSeason(),
          PublicApiService.getProximoTorneio(),
          PublicApiService.getFotosGaleria()
        ])

        setCurrentSeasonRanking(currentSeasonData) // Top 10 da temporada atual
        setProximoTorneio(torneioData)
        setFotos(fotosData.slice(0, 6)) // Primeiras 6 fotos
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
              onClick={() => scrollToSection('galeria')}
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
              Galeria
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
            
            <ListItem onClick={() => scrollToSection('galeria')}>
              <ListItemIcon>
                <PeopleIcon sx={{ color: '#eab308' }} />
              </ListItemIcon>
              <ListItemText primary="Galeria" />
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
                <Box component="span" sx={{ color: '#f59e0b' }}>
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
                  { icon: <TrophyIcon />, title: 'Torneios Regulares', desc: 'Eventos todas as semanas', color: '#10b981' },
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
                      bgcolor: `rgba(${item.color === '#10b981' ? '16, 185, 129' : item.color === '#3b82f6' ? '59, 130, 246' : '168, 85, 247'}, 0.15)`,
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
                <Typography
                  variant="h3"
                  sx={{
                    background: 'linear-gradient(135deg, #eab308, #facc15, #ca8a04)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                    mb: 4,
                    fontSize: { xs: '2rem', md: '2.8rem' }
                  }}
                >
                  Torneio de Natal 2024
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
                  Torneio especial de fim de ano com estrutura profissional, blinds lentos e prêmios garantidos. 
                  Uma oportunidade única para encerrar o ano com chave de ouro!
                </Typography>
                
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={3} 
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayIcon />}
                    sx={{
                      bgcolor: '#22c55e',
                      color: 'white',
                      px: 6,
                      py: 2.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '12px',
                      textTransform: 'none',
                      boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)',
                      '&:hover': {
                        bgcolor: '#16a34a',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 35px rgba(34, 197, 94, 0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Inscrever-se Agora
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<TrophyIcon />}
                    onClick={() => scrollToSection('ranking')}
                    sx={{
                      borderColor: '#eab308',
                      color: '#eab308',
                      px: 6,
                      py: 2.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '12px',
                      textTransform: 'none',
                      borderWidth: '2px',
                      '&:hover': {
                        bgcolor: 'rgba(234, 179, 8, 0.1)',
                        transform: 'translateY(-3px)',
                        borderColor: '#facc15',
                        borderWidth: '2px'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Ver Rankings
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
          
          {/* Ranking Table */}
          <Box sx={{ 
            maxWidth: '900px', 
            mx: 'auto',
            bgcolor: 'white',
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden'
          }}>
            <Table>
              <TableHead>
                <TableRow sx={{ 
                  bgcolor: '#f8fafc',
                  borderBottom: '2px solid #eab308'
                }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1e293b', py: 3 }}>
                    Posição
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1e293b', py: 3 }}>
                    Jogador
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: '#1e293b', py: 3 }}>
                    Pontuação
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: '#1e293b', py: 3 }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentSeasonRanking.slice(0, 10).map((jogador, index) => {
                  const posicao = index + 1;
                  const getMedalIcon = () => {
                    switch (posicao) {
                      case 1: return '🥇';
                      case 2: return '🥈';
                      case 3: return '🥉';
                      default: return posicao.toString();
                    }
                  };

                  return (
                    <TableRow
                      key={jogador.id || index}
                      sx={{
                        '&:hover': {
                          bgcolor: '#f8fafc',
                          transform: 'scale(1.01)',
                        },
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                    >
                      <TableCell sx={{ py: 3, fontSize: '1.2rem', fontWeight: 'bold' }}>
                        {posicao <= 3 ? getMedalIcon() : posicao}
                      </TableCell>
                      <TableCell sx={{ py: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            sx={{
                              bgcolor: posicao <= 3 ? '#eab308' : '#64748b',
                              fontWeight: 'bold'
                            }}
                          >
                            {(jogador.jogador?.nome || 'J').charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                              {jogador.jogador?.nome || 'Jogador Anônimo'}
                            </Typography>
                            {jogador.jogador?.apelido && (
                              <Typography variant="body2" sx={{ color: '#64748b', fontStyle: 'italic' }}>
                                &ldquo;{jogador.jogador.apelido}&rdquo;
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                          {jogador.pontuacao?.toLocaleString() || 0}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 3 }}>
                        <Chip
                          label={posicao <= 3 ? 'Pódio' : posicao <= 5 ? 'Top 5' : 'Top 10'}
                          sx={{
                            bgcolor: posicao <= 3 ? '#fef3c7' : posicao <= 5 ? '#dbeafe' : '#f1f5f9',
                            color: posicao <= 3 ? '#92400e' : posicao <= 5 ? '#1e40af' : '#475569',
                            fontWeight: 600
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>

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
                bgcolor: '#eab308',
                color: '#1a1a1a',
                px: 6,
                py: 2.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '12px',
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(234, 179, 8, 0.3)',
                '&:hover': {
                  bgcolor: '#facc15',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 35px rgba(234, 179, 8, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Participar do Próximo Torneio
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Galeria de Fotos - Light Theme */}
      {fotos.length > 0 && (
        <Box id="galeria" sx={{ 
          py: 10,
          background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.95) 0%, rgba(202, 138, 4, 0.98) 100%)',
          position: 'relative',
          overflow: 'hidden',
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
            opacity: 0.05,
            zIndex: 0
          }
        }}>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2
                }}
              >
                <PhotoCameraIcon sx={{ color: 'white', fontSize: { xs: '2.5rem', md: '3.5rem' } }} />
                Galeria de Momentos
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 6,
                  fontSize: '1.2rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                Os melhores momentos dos nossos torneios emocionantes
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 4
            }}>
              {fotos.map((foto) => (
                <Card
                  key={foto.id}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 4,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                      '& .foto-overlay': {
                        opacity: 1
                      }
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: 250,
                      backgroundImage: `url(${foto.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative'
                    }}
                  >
                    {/* Overlay com informações da foto */}
                    <Box
                      className="foto-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        p: 2,
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      }}
                    >
                      {foto.descricao && (
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'white',
                            fontWeight: 600
                          }}
                        >
                          {foto.descricao}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>

            {/* Call to Action para ver galeria completa */}
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 6,
                  py: 2.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  textTransform: 'none',
                  borderWidth: '2px',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-3px)',
                    borderColor: 'white',
                    borderWidth: '2px'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Ver Galeria Completa
              </Button>
            </Box>
          </Container>
        </Box>
      )}

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
                  { icon: '', title: 'Excelência', desc: 'Torneios com estrutura profissional' },
                  { icon: '', title: 'Comunidade', desc: 'Ambiente acolhedor e respeitoso' },
                  { icon: '', title: 'Integridade', desc: 'Fair play e transparência sempre' }
                ].map((value, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Typography variant="h4" sx={{ fontSize: '2rem' }}>
                      {value.icon}
                    </Typography>
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
                O principal clube de poker do Brasil. Junte-se à nossa comunidade 
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
                  { label: 'Galeria', action: () => scrollToSection('galeria') },
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
                    (11) 99999-9999
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ color: '#eab308', fontSize: '1.2rem' }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Recife, PE - Brasil
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