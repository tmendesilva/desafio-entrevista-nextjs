'use client'

import ErrorAlert from '@/components/auth/ErrorAlert'
import Button from '@/components/form/Button'
import CardToForm from '@/components/form/CardToForm'
import { useAuth } from '@/contexts/AuthContext'
import UserService, { SignUpRequestData } from '@/services/UserService'
import { TextField } from '@mui/material'
import { isArray } from 'lodash'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Home = () => {
  const { register, handleSubmit } = useForm<SignUpRequestData>()
  const { setIsLoading } = useAuth()
  const [errors, setErrors] = useState([])

  const onSubmit = async (data: SignUpRequestData) => {
    setIsLoading(true)
    const res = await UserService.create(data)
    setErrors(res?.errorMessage || [])
    setIsLoading(false)
  }

  return (
    <CardToForm title={'Register user'}>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          variant="outlined"
          fullWidth={true}
          label="Name"
          {...register('name')}
        />
        <TextField
          variant="outlined"
          fullWidth={true}
          label="Email"
          type={'email'}
          {...register('email')}
        />
        <TextField
          variant="outlined"
          fullWidth={true}
          label="Password"
          type="password"
          {...register('password')}
        />
        <div>
          {errors &&
            isArray(errors) &&
            errors.map((error: string) => <ErrorAlert errorMessage={error} />)}
        </div>
        <Button type="submit">Register</Button>
      </form>
    </CardToForm>
  )
}

export default Home
