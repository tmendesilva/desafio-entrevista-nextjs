import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  timeoutErrorMessage: 'Time out!',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

export type ApiResponse = {
  success?: boolean
  errorMessage?: []
}

export default api
