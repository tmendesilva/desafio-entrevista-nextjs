'use client'
import withAuth from '@/hocs/withAuth'
import userService from '@/services/UserService'
import { Box, Button } from '@mui/material'
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type User = {
  id: number
  name: string
  email: string
}

const Home = () => {
  const [users, setUsers] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function listUsers() {
      const userList = await userService.list()
      setUsers(userList.data)
    }
    listUsers()
  }, [])

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email', //normal accessorKey
        header: 'Email',
      },
    ],
    []
  )

  return (
    <div className="max-w py-6 rounded overflow-hidden shadow-lg">
      <div className="px-6 pe-2">
        <h2>Users</h2>
      </div>
      <div className="px-6 py-2">
        <MaterialReactTable
          columns={columns}
          data={users}
          renderTopToolbarCustomActions={({ table }) => (
            <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
              <Button
                color="inherit"
                onClick={() => router.push('/users/signup')}
                variant="contained"
                size="small"
              >
                Create user
              </Button>
            </Box>
          )}
        />
      </div>
    </div>
  )
}

export default withAuth(Home)
