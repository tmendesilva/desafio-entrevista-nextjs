'use client'

import ErrorAlert from '@/components/auth/ErrorAlert'
import Button from '@/components/form/Button'
import { useAuth } from '@/contexts/AuthContext'
import { VehicleData } from '@/services/VehicleService'
import { ApiResponse } from '@/services/api'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { isArray } from 'lodash'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

const VehicleForm = ({
  action,
  vehicle,
}: {
  action: (data: VehicleData) => Promise<ApiResponse>
  vehicle?: VehicleData
}) => {
  const { handleSubmit, register, reset } = useForm<VehicleData>({
    defaultValues: useMemo(() => {
      console.log('vehicle has changed')
      return vehicle
    }, [vehicle]),
  })
  const { setIsLoading } = useAuth()
  const [errors, setErrors] = useState([])
  const router = useRouter()

  useEffect(() => {
    console.log('Reset')
    console.log(vehicle)
    reset(vehicle)
  }, [vehicle])

  const onSubmit = async (data: VehicleData) => {
    setIsLoading(true)
    const res = await action(data)
    setIsLoading(false)
    if (!res?.errorMessage) {
      router.push('/vehicles')
    }
    setErrors(res?.errorMessage || [])
  }

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="model"
        variant="outlined"
        fullWidth={true}
        label="Model"
        InputLabelProps={{ shrink: !!vehicle?.model }}
        {...register('model')}
      />
      <TextField
        id="color"
        variant="outlined"
        fullWidth={true}
        label="Color"
        InputLabelProps={{ shrink: !!vehicle?.color }}
        {...register('color')}
      />
      <TextField
        id="brand"
        variant="outlined"
        fullWidth={true}
        label="Brand"
        InputLabelProps={{ shrink: !!vehicle?.brand }}
        {...register('brand')}
      />
      <TextField
        id="plate"
        variant="outlined"
        fullWidth={true}
        label="Plate"
        InputLabelProps={{ shrink: !!vehicle?.plate }}
        {...register('plate')}
      />

      <FormControl fullWidth>
        <InputLabel id="label-type">Type</InputLabel>
        <Select
          id="type"
          labelId="label-type"
          label="Type"
          defaultValue=""
          {...register('type')}
        >
          <MenuItem value={'car'}>Car</MenuItem>
          <MenuItem value={'motorcicle'}>Motorcicle</MenuItem>
        </Select>
      </FormControl>

      <div>
        {errors &&
          isArray(errors) &&
          errors.map((error: string) => <ErrorAlert errorMessage={error} />)}
      </div>
      <Button type="submit">{vehicle?.id ? 'Update' : 'Register'}</Button>
    </form>
  )
}

export default VehicleForm
