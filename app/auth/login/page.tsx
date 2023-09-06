'use client'
import ErrorAlert from '@/components/auth/ErrorAlert'
import Button from '@/components/form/Button'
import CardToForm from '@/components/form/CardToForm'
import { useAuth } from '@/contexts/AuthContext'
import { SignInRequestData } from '@/services/AuthService'
import { TextField } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Home() {
  const { handleSubmit, register } = useForm<SignInRequestData>()
  const { signIn } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: SignInRequestData) => {
    const res = await signIn(data)
    setError(res?.errorMessage || null)
  }

  return (
    <CardToForm title={'Sign in to your account'}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="email"
          variant="outlined"
          fullWidth={true}
          label="Email"
          type={'email'}
          {...register('email')}
        />
        <TextField
          id="password"
          variant="outlined"
          fullWidth={true}
          label="Password"
          type="password"
          {...register('password')}
        />
        <div>{error && <ErrorAlert errorMessage={error} />}</div>
        <Button type="submit">Sign in</Button>
        <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
          Don't have an account yet?
          <Link
            href="/users/signup"
            className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign up
          </Link>
        </p>
      </form>
    </CardToForm>
  )
}
