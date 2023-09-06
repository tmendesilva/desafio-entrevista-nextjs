import Loading from '@/components/layout/Loading'
import { useAuth } from '@/contexts/AuthContext'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute({ ...props }) {
    const { isAuthenticated, isLoading } = useAuth()

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        redirect('/auth/login')
      }
    }, [isLoading, isAuthenticated])

    if (isLoading) {
      return <Loading />
    }

    if (isAuthenticated) {
      return <Component {...props} />
    }
  }
}
