import axios from 'axios'
const baseUrl = '/api/login'
const baseUrl2 = '/api/blogs'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const checkToken = async token =>{
  const response = await axios.get(`${baseUrl2}/${token}`) 
  return response.data
}

const loginObject =  { login , checkToken }
export default loginObject;