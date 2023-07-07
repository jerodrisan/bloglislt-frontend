import axios from 'axios'
const baseUrl = '/api/blogs'
const baseUrl2 = '/api/blogs/usuario'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUserBlogs = async (userid) =>{
  const response = await axios.get(`${baseUrl2}/${userid}`)
  return response.data
}

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,create, setToken, getUserBlogs}