import axios from 'axios'

//const API_BASE_URL = 'http://localhost:8080/api/tasks'
const API_BASE_URL = '/api/tasks'
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const getTasks = () => api.get('')
export const getTask = (id) => api.get(`/${id}`)
export const createTask = (task) => api.post('', task)
export const updateTask = (id, task) => api.put(`/${id}`, task)
export const deleteTask = (id) => api.delete(`/${id}`)

export default api
