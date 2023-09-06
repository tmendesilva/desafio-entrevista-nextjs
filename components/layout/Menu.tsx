import { useAuth } from '@/contexts/AuthContext'
import React from 'react'
import Logout from '../auth/Logout'
import Link from 'next/link'

const Menu = () => {
  const { isAuthenticated } = useAuth()
  return (
    <div className="px-2 md:px-0 py-3 space-y-2 md:space-y-0 md:space-x-2 font-medium">
      {isAuthenticated ? (
        <>
          {menuItems.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.path}
                className="block md:inline-block px-3 py-2 rounded-md"
              >
                {item.title}
              </Link>
            )
          })}
          <Logout />
        </>
      ) : (
        <Link
          key={'login'}
          href={'/auth/login'}
          className="block md:inline-block px-3 py-2 rounded-md"
        >
          Login
        </Link>
      )}
    </div>
  )
}

const menuItems = [
  {
    title: 'Companies',
    path: '/companies',
  },
  {
    title: 'Vehicles',
    path: '/vehicles',
  },
  {
    title: 'Tickets',
    path: '/tickets',
  },
  {
    title: 'Users',
    path: '/users',
  },
]

export default Menu
