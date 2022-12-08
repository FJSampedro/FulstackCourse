require('dotenv').config(".env") //carga las variables de entorno definidas en el archivo .env
const express = require("express")
const cors = require("cors")
const Note = require('./models/note')

const app = express()
app.use(cors())
app.use(express.json()) //esto es una llamada a un middleware, una funcion que express ejecuta sobre la peticion antes de darla a nuestra funcion

const requestLogger = (request, response, next) => { // Esta es una definicion de un custom middleware, siempre tienen que tener estos tres parametros.
    console.log('Method:', request.method) //los middleware suelen definirse y llamarse ANTES de las rutas 
    console.log('Path:  ', request.path)  //pero tambien pueden ser llamados despues de ellas para ser usados en caso de que las rutas anteriores no gestionen la peticion
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => { //Custom middleware que gestiona un endpoint desconocido
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(requestLogger) //llamada a nuestro custom middleware

app.get('/', (request, response) => {
    response.send('<h1>This is the API Notes Backend</h1><a href="/api/notes"> all notes </a>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.delete('/api/notes/:id', (request, response) => {
    Note.findByIdAndDelete(request.params.id).then(response.status(204).end())
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.use(unknownEndpoint) //llamada al middleware que gestiona un endpoint desconocido

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`);