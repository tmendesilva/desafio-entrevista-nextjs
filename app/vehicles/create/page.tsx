'use client'

import CardToForm from '@/components/form/CardToForm'
import VehicleForm from '@/components/vehicles/VehicleForm'
import VehicleService from '@/services/VehicleService'

const Home = () => {
  return (
    <CardToForm title={'Register vehicle'}>
      <VehicleForm action={VehicleService.create}></VehicleForm>
    </CardToForm>
  )
}

export default Home
