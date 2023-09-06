'use client'
import withAuth from '@/hocs/withAuth'
import VehicleService from '@/services/CompanyService'
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'

type Vehicle = {
  id: number
  name: string
  cnpj: string
  address: string
  phone: string
  car_space_amount: number
  motorcycle_space_amount: number
}

const Home = () => {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    async function listCompanies() {
      const companyList = await VehicleService.list()
      setCompanies(companyList.data)
    }
    listCompanies()
  }, [])

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Vehicle>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'cnpj', //normal accessorKey
        header: 'CNPJ',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
      {
        accessorKey: 'car_space_amount',
        header: 'Car spaces',
      },
      {
        accessorKey: 'motorcycle_space_amount',
        header: 'Motorcicle spaces',
      },
    ],
    []
  )

  return (
    <div className="max-w py-6 rounded overflow-hidden shadow-lg">
      <div className="px-6 pe-2">
        <h2>Companies</h2>
      </div>
      <div className="px-6 py-2">
        <MaterialReactTable columns={columns} data={companies} />
      </div>
    </div>
  )
}

export default withAuth(Home)
