import api from './api'

class CompanyService {
  list = async (): Promise<{ data: [] }> => {
    return await api.get('/company').then((res) => {
      return {
        data: res.data,
      }
    })
  }
}

export default new CompanyService()
