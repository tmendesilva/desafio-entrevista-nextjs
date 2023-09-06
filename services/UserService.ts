import api from './api'

export type SignUpRequestData = {
  name: String
  email: string
  password: string
}

type SignUpResponse = {
  success?: boolean
  errorMessage?: []
}

class UserService {
  create = async (data: SignUpRequestData): Promise<SignUpResponse> => {
    return await api
      .post('/user', data)
      .then((res) => {
        return {
          success: res.status === 201,
        }
      })
      .catch((err: any) => {
        return {
          errorMessage: err.response?.data?.message || 'Error on register user',
        }
      })
  }

  list = async (): Promise<{ data: [] }> => {
    return await api.get('/user').then((res) => {
      return {
        data: res.data,
      }
    })
  }
}

export default new UserService()
