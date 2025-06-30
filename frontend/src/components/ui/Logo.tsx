import React from 'react'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'

interface LogoProps {
  variant?: 'icon' | 'text' | 'full'
  size?: number
  color?: 'gold' | 'white' | 'black' | 'dark'
  showText?: boolean
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  size = 40, 
  color = 'gold',
  showText = true 
}) => {
  const logoSize = variant === 'icon' ? size : size
  const textColor = color === 'gold' ? '#DAA520' : 
                   color === 'white' ? 'white' : 
                   color === 'black' ? 'black' : 
                   color === 'dark' ? '#333' : '#DAA520'

  if (variant === 'icon') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src="/logo/image copy 2.png"
          alt="Aces League Logo"
          width={logoSize}
          height={logoSize}
          style={{
            borderRadius: '50%'
          }}
        />
      </Box>
    )
  }

  if (variant === 'text') {
    return (
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: textColor,
          fontFamily: 'monospace',
          letterSpacing: '2px'
        }}
      >
        ACES LEAGUE
      </Typography>
    )
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: logoSize > 60 ? 3 : 2 }}>
      <Image
        src="/logo/image copy 2.png"
        alt="Aces League Logo"
        width={logoSize}
        height={logoSize}
        style={{
          borderRadius: '50%'
        }}
      />
      {showText && (
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              color: textColor,
              fontFamily: 'monospace',
              letterSpacing: '2px',
              lineHeight: 1,
              fontSize: logoSize > 60 ? '1.8rem' : logoSize > 45 ? '1.5rem' : '1.25rem',
              textShadow: color === 'gold' ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none'
            }}
          >
            ACES LEAGUE
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: color === 'gold' ? 'rgba(218, 165, 32, 0.8)' : 
                     color === 'dark' ? 'rgba(51, 51, 51, 0.7)' :
                     'rgba(255, 255, 255, 0.7)',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              fontSize: logoSize > 60 ? '0.8rem' : logoSize > 45 ? '0.7rem' : '0.65rem'
            }}
          >
            Poker Club
          </Typography>
        </Box>
      )}
    </Box>
  )
}