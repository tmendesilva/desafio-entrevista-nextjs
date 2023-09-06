import api, { ApiResponse } from './api'

export type VehicleData = {
  id?: number
  brand?: string
  model?: string
  color?: string
  plate?: string
  type?: string
}

class VehicleService {
  create = async (data: VehicleData): Promise<ApiResponse> => {
    return await api
      .post('/vehicle', data)
      .then((res) => {
        return {
          success: res.status === 201,
        }
      })
      .catch((err: any) => {
        return {
          errorMessage: err.response?.data?.message || 'Error',
        }
      })
  }

  update = async (data: VehicleData): Promise<ApiResponse> => {
    return await api
      .put(`/vehicle/${data.id}`, data)
      .then((res) => {
        return {
          success: res.status === 201,
        }
      })
      .catch((err: any) => {
        return {
          errorMessage: err.response?.data?.message || 'Error',
        }
      })
  }

  list = async (): Promise<{ data: [] }> => {
    return await api.get('/vehicle').then((res) => {
      return {
        data: res.data,
      }
    })
  }

  find = async (id: number): Promise<{ data: VehicleData }> => {
    return await api.get(`/vehicle/${id}`).then((res) => {
      return {
        data: res.data,
      }
    })
  }

  delete = async (id: Number): Promise<{ status: number }> => {
    return await api.delete(`/vehicle/${id}`).then((res) => {
      return {
        status: res.status,
      }
    })
  }
}

export default new VehicleService()
