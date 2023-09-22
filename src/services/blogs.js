import axios from 'axios'
const baseUrl = '/api/blogs'
const baseUrl2 = '/api/blogs/usuario'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUserBlogs = async (userid) =>{
  const response = await axios.get(`${baseUrl2}/${userid}`)
  //const data = await response.data
  //console.log(data)
  //return  data  
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



const updateBlogLikes = async id => {
  const response = await axios.put(`${baseUrl}/${id}`) // en este caso no usamos en el put un segundo parametro body ya que solo queremos pasar la id
  //console.log('datos likes',response.data)
  return response.data  
}

const removeBlog = async id=>{
  const config ={
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  //console.log('borrado el blog',response.data)
  return response.data
  
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,create, setToken, getUserBlogs, updateBlogLikes, removeBlog}