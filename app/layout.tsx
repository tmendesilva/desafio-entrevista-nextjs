import { AuthProvider } from '@/contexts/AuthContext'
import type { Metadata } from 'next'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dr Consulta | Desafio Entrevista',
  description: 'Desafio Entrevista',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <div className="max-w-7xl mx-auto my-10">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
