import { useState } from "react"
import { AuthContext } from "./AuthContext"
import { useApi } from "../hooks/useApi";

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({ log: false, data: {} });
  const api = useApi();

  const createTask = async (idUser, myTask) => {
    const response = await api.createTask(idUser, myTask)
    return response;
  }

  const listTasks = async (idUser) => {
    const response = await api.listTasks(idUser)
    return response;
  }

  const updateTask = async (id, status) => {
    const response = await api.updateTask(id, status)
    return response;
  }

  const deleteTask = async (id) => {
    const response = await api.deleteTask(id)
    return response;
  }

  const sign = async (email, password) => {
    const response = await api.sign(email, password)
    response.status === 200 && setUser({ log: true, data: response.data })
    return response;
  }

  const register = async (name, email, tel, profile, password) => {
    const response = await api.register(name, email, tel, profile, password)
    return response;
  }

  const profile = async (id, token) => {
    const response = await api.profile(id, token)
    return response;
  }

  const edit = async (id, name, email, tel, profile) => {
    const response = await api.edit(id, name, email, tel, profile)
    return response;
  }

  const remove = async (id, token) => {
    const response = await api.remove(id, token)
    return response;
  }


  return (
    <AuthContext.Provider value={{ user, createTask, listTasks, updateTask, deleteTask, sign, register, profile, edit, remove }}>
      {children}
    </AuthContext.Provider>
  )
}