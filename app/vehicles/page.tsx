'use client'
import { useAuth } from '@/contexts/AuthContext'
import withAuth from '@/hocs/withAuth'
import VehicleService, { VehicleData } from '@/services/VehicleService'
import { Delete, Edit } from '@mui/icons-material'
import { Box, Button, IconButton, Tooltip } from '@mui/material'
import {
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTable,
} from 'material-react-table'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const Home = () => {
  const [vehicles, setVehicles] = useState([])
  const router = useRouter()
  const { setIsLoading } = useAuth()

  async function listVehicles() {
    const vehicleList = await VehicleService.list()
    setVehicles(vehicleList.data)
  }

  useEffect(() => {
    setIsLoading(true)
    listVehicles()
    setIsLoading(false)
  }, [])

  const handleUpdateRow = (row: MRT_Row<VehicleData>) => {
    router.push(`/vehicles/update?id=${row.getValue('id')}`)
  }

  const handleDeleteRow = async (row: MRT_Row<VehicleData>) => {
    if (!confirm(`Are you sure you want to delete ${row.getValue('plate')}`)) {
      return
    }
    setIsLoading(true)
    const { status } = await VehicleService.delete(row.getValue('id'))
    if (status === 200) {
      listVehicles()
    }
    setIsLoading(false)
  }

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<VehicleData>[]>(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'ID',
      },
      {
        accessorKey: 'model', //access nested data with dot notation
        header: 'Model',
      },
      {
        accessorKey: 'color',
        header: 'Color',
      },
      {
        accessorKey: 'brand', //normal accessorKey
        header: 'Brand',
      },
      {
        accessorKey: 'type',
        header: 'Type',
      },
      {
        accessorKey: 'plate',
        header: 'Plate',
      },
    ],
    []
  )

  return (
    <div className="max-w py-6 rounded overflow-hidden shadow-lg">
      <div className="px-6 pe-2">
        <h2>Vehicles</h2>
      </div>
      <div className="px-6 py-2">
        <MaterialReactTable
          columns={columns}
          data={vehicles}
          renderTopToolbarCustomActions={({ table }) => (
            <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
              <Link href="/vehicles/create">
                <Button color="inherit" variant="contained" size="small">
                  Create vehicle
                </Button>
              </Link>
            </Box>
          )}
          enableEditing
          displayColumnDefOptions={{
            'mrt-row-actions': {
              muiTableHeadCellProps: {
                align: 'center',
              },
            },
          }}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="right" title="Edit">
                <IconButton onClick={() => handleUpdateRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
      </div>
    </div>
  )
}

export default withAuth(Home)
