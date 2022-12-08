require('dotenv').config(".env") 
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require('./models/person')

const app = express()
morgan.token("exercise",function (req,res){return JSON.stringify(req.body)})
app.use(cors())
app.use(express.static('build'))//Load the static frontend page
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :exercise"))

app.set('view engine', 'pug')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

app.get('/info', (request, response) => {
    console.log();
    response.render('index', { title: 'Phonebook info', personsNumber: persons.length, date: Date().toLocaleString() })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    }).catch(error=>{response.status(404).end()})
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    }
    if (persons.map(person => person.name).includes(body.name) === true) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: getRandomInt(999999999999),
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})