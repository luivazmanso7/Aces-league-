import React from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'

interface LogoProps {
  size?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 40
}) => {
  // Função para extrair o tamanho baseado em breakpoints ou número simples
  const getSize = () => {
    if (typeof size === 'number') {
      return size
    }
    // Para tamanhos responsivos, vamos usar o maior valor como fallback
    return size.xl || size.lg || size.md || size.sm || size.xs || 40
  }

  const logoSize = getSize()

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center',
        // Aplicar tamanhos responsivos se size for um objeto
        ...(typeof size === 'object' && {
          '& img': {
            width: { 
              xs: size.xs || logoSize, 
              sm: size.sm || logoSize,
              md: size.md || logoSize,
              lg: size.lg || logoSize,
              xl: size.xl || logoSize
            },
            height: { 
              xs: size.xs || logoSize, 
              sm: size.sm || logoSize,
              md: size.md || logoSize,
              lg: size.lg || logoSize,
              xl: size.xl || logoSize
            }
          }
        })
      }}
    >
      <Image
        src="/logo/image copy 2.png"
        alt="Aces League Logo"
        width={logoSize}
        height={logoSize}
      />
    </Box>
  )
}