'use client'
import { useAuth } from '@/contexts/AuthContext'

export default function Logout() {
  const { signOut } = useAuth()

  const logout = async () => {
    await signOut()
  }

  return (
    <>
      <a
        key={'logout'}
        href={'#'}
        onClick={logout}
        className="block md:inline-block px-3 py-2 rounded-md"
      >
        Logout
      </a>
    </>
  )
}
