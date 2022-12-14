import axios from 'axios'
const baseUrl = '/api/persons'

const addPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data);
}

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const deletePerson = (id) =>{
    const request = axios.delete(baseUrl+`/${id}`)
    return request.then(response=>response)
}

const updatePerson = (person) => {
    const request = axios.put(baseUrl+`/${person.id}`, person)
    return request.then(response=> response)
}

const personsService = {addPerson, getPersons, deletePerson, updatePerson}

export default personsService
