import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// returns all the contents in the notes collection
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
};

// takes in an object parameter of a note and posts it to the json server
const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config);
  return response.data
};

// retrieving the specific url for the current object with id and replacing its contents with the newObject
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data)
};

export default { getAll, create, update, setToken };
