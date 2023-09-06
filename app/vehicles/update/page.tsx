'use client'

import CardToForm from '@/components/form/CardToForm'
import VehicleForm from '@/components/vehicles/VehicleForm'
import VehicleService, { VehicleData } from '@/services/VehicleService'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Home = () => {
  const [vehicle, setVehicle] = useState<VehicleData>({})
  const searchParams = useSearchParams()

  async function findOne(id: number) {
    const res = await VehicleService.find(id)
    setVehicle(res.data)
  }

  useEffect(() => {
    const vehicleId = searchParams.get('id')
    if (vehicleId) {
      findOne(parseInt(vehicleId))
    }
  }, [])

  return (
    <CardToForm title={'Update vehicle'}>
      <VehicleForm
        action={VehicleService.update}
        vehicle={vehicle}
      ></VehicleForm>
    </CardToForm>
  )
}

export default Home
