'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(credentials.email.trim(), credentials.password);
      router.push('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#252525',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Box
        sx={{
          width: 400,
          backgroundColor: '#1a1a1a',
          border: '2px solid #333',
          borderRadius: 0,
          padding: 4
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#ffffff',
              fontFamily: 'monospace',
              letterSpacing: '3px',
              marginBottom: 1
            }}
          >
            ACES POKER
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontSize: '0.9rem'
            }}
          >
            ADMIN
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            sx={{
              marginBottom: 3,
              backgroundColor: '#2d1a1a',
              border: '1px solid #4d2626',
              borderRadius: 0,
              color: '#ff6b6b',
              '& .MuiAlert-icon': {
                color: '#ff6b6b',
              },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={credentials.email}
            onChange={handleChange('email')}
            required
            sx={{ 
              marginBottom: 3,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#1f1f1f',
                borderRadius: 0,
                '& fieldset': {
                  borderColor: '#404040',
                  borderWidth: 2
                },
                '&:hover fieldset': {
                  borderColor: '#505050',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#606060',
                },
                '& input': {
                  color: '#ffffff',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  padding: '14px'
                },
              },
              '& .MuiInputLabel-root': {
                color: '#888',
                fontFamily: 'monospace',
                fontSize: '1rem',
                '&.Mui-focused': {
                  color: '#999',
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            value={credentials.password}
            onChange={handleChange('password')}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    sx={{
                      color: '#888',
                      '&:hover': {
                        color: '#aaa'
                      }
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ 
              marginBottom: 4,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#1f1f1f',
                borderRadius: 0,
                '& fieldset': {
                  borderColor: '#404040',
                  borderWidth: 2
                },
                '&:hover fieldset': {
                  borderColor: '#505050',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#606060',
                },
                '& input': {
                  color: '#ffffff',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  padding: '14px'
                },
              },
              '& .MuiInputLabel-root': {
                color: '#888',
                fontFamily: 'monospace',
                fontSize: '1rem',
                '&.Mui-focused': {
                  color: '#999',
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              height: 56,
              backgroundColor: '#2a2a2a',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 700,
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              borderRadius: 0,
              border: '2px solid #3a3a3a',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#3a3a3a',
                border: '2px solid #4a4a4a',
                boxShadow: 'none',
              },
              '&:disabled': {
                backgroundColor: '#1a1a1a',
                color: '#666',
                border: '2px solid #2a2a2a'
              },
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} sx={{ color: '#666' }} />
                ENTRANDO...
              </Box>
            ) : (
              'ENTRAR'
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
