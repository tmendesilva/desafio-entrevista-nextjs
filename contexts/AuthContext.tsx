'use client'
import AuthService from '@/services/AuthService'
import api from '@/services/api'
import jwtDecode from 'jwt-decode'
import nookies, { destroyCookie, setCookie } from 'nookies'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type UserToken = {
  email: string
  expiration: number
} | null

type Payload = {
  email: string
  iat: number
  exp: number
}

type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  userToken: UserToken
  signIn: (data: signInData) => Promise<void | { errorMessage: string }>
  signOut: () => Promise<void>
}

type signInData = {
  email: string
  password: string
}

const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<UserToken | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = nookies.get()?.['drc.token']
    if (token) {
      console.log("Got a token in the cookies, let's see if it is valid")
      api.defaults.headers.Authorization = `Bearer ${token}`
      const jwtDecoded: Payload = jwtDecode(token)
      setUserToken({
        email: jwtDecoded.email,
        expiration: jwtDecoded.exp,
      })
    }
    setIsLoading(false)
  }, [])

  async function signIn({ email, password }: signInData) {
    const { accessToken, errorMessage } = await AuthService.login({
      email,
      password,
    })

    if (errorMessage) {
      return { errorMessage }
    }

    if (accessToken) {
      const jwtDecoded: Payload = jwtDecode(accessToken)

      setCookie(undefined, 'drc.token', accessToken, {
        path: '/',
        maxAge: Math.round(jwtDecoded.exp - new Date().getTime() / 1000), // Backend expiration
      })

      api.defaults.headers['Authorization'] = `Bearer ${accessToken}`
      window.location.pathname = '/tickets'
    }
  }

  async function signOut() {
    destroyCookie(undefined, 'drc.token', {
      path: '/',
    })
    setUserToken(null)
    delete api.defaults.headers['Authorization']
    window.location.pathname = '/auth/login'
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!userToken,
        isLoading,
        setIsLoading,
        userToken,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
