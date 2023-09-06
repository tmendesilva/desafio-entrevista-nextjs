import api from './api'

export type SignInRequestData = {
  email: string
  password: string
}

type SignInResponse = {
  accessToken?: string
  errorMessage?: string
}

class AuthService {
  login = async (data: SignInRequestData): Promise<SignInResponse> => {
    return await api
      .post('/auth/login', data)
      .then((res) => {
        return {
          accessToken: res.data.token,
        }
      })
      .catch((err: any) => {
        return {
          errorMessage: err.response?.data?.message || 'Error on login',
        }
      })
  }
}

export default new AuthService()
