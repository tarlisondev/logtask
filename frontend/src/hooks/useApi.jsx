
import axios from 'axios';
import config from "../config/config.js"

const api = axios.create({
  baseURL: config.web.local
});

export const useApi = () => ({

  async createTask(idUser, myTask) {
    const response = await api.post('/task/' + idUser, { idUser, myTask })
    return response;
  },

  async listTasks(idUser) {
    const response = await api.get('/task/' + idUser)
    return response;
  },

  async updateTask(id, status) {
    const response = await api.patch('/task/' + id, { status })
    return response;
  },

  async deleteTask(id) {
    const response = await api.delete('/task/' + id)
    return response;
  },

  async sign(email, password) {
    const response = await api.post('/sign', { email, password })
    return response;
  },

  async register(name, email, tel, profile, password) {
    const response = await api.post('/register', { name, email, tel, profile, password })
    return response;
  },

  async profile(id, token) {
    const response = await api.get('/profile/' + id, { headers: { Authorization: "bearer " + token } })
    return response;
  },

  async edit(id, name, email, tel, profile) {
    const response = await api.put('/update/' + id, { name, email, tel, profile })
    return response;
  },

  async remove(id, token) {
    const response = await api.delete('/delete/' + id, { headers: { Authorization: "bearer " + token } })
    return response;
  }

})

