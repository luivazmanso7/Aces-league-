'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import api from '@/lib/api'

interface User {
  id: number
  nome: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('auth-token')
    if (token) {
      // Verificar se o token ainda é válido
      api.get('/auth/profile')
        .then(response => {
          setUser(response.data)
        })
        .catch(() => {
          Cookies.remove('auth-token')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      console.log('Tentando fazer login...', { email })
      const response = await api.post('/auth/login', { email, password })
      const { access_token, admin: userData } = response.data
      
      console.log('Login bem-sucedido:', { userData, token: access_token.substring(0, 20) + '...' })
      
      // Configurar cookie com flags de segurança
      Cookies.set('auth-token', access_token, { 
        expires: 1, // 1 dia (reduzido para maior segurança)
        secure: false, // Permitir HTTP em desenvolvimento
        sameSite: 'lax', // Mais permissivo em desenvolvimento
        httpOnly: false // Necessário false para acesso via JS no frontend
      })
      
      console.log('Token salvo no cookie')
      setUser(userData)
      console.log('Usuário definido no contexto:', userData)
    } catch (error) {
      // Não expor detalhes do erro no console em produção
      if (process.env.NODE_ENV === 'development') {
        console.error('Login error:', error);
      }
      throw new Error('Credenciais inválidas')
    }
  }

  const logout = () => {
    Cookies.remove('auth-token', { 
      secure: false,
      sameSite: 'lax'
    })
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}
