import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const addPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data);
}
const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const deletePersons = (person) =>{
    const request = axios.delete(baseUrl+`/${person}`)
    return request.then(response=>response)
}
export default {addPerson, getPersons, deletePersons}
