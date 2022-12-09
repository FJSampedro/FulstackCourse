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

app.use(requestLogger) //llamada a nuestro custom middleware

app.get('/', (request, response) => {
    response.send('<h1>This is the API Notes Backend</h1><a href="/api/notes"> all notes </a>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

// Manejo de errores directamente en el codigo de respuesta
// app.get('/api/notes/:id', (request, response) => {
//     Note.findById(request.params.id)
//         .then(note => {
//             if (note) {
//                 response.json(note)
//             } else {
//                 response.status(404).end()
//             }
//         })
//         .catch(error => {
//             console.log(error)
//             response.status(500).end()
//             //response.status(400).send({ error: 'malformatted id' })
//         })
// })

// Manejo de errores mediante middleware
app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => {
    const body = request.body
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })
  
    note.save()
      .then(savedNote => {
        response.json(savedNote.toJSON())
      })
      .catch(error => next(error))
  })

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => { //Custom middleware que gestiona un endpoint desconocido
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint) //llamada al middleware que gestiona un endpoint desconocido

const errorHandler = (error, request, response, next) => { //Middleware manejador de errores
    //console.error(error.message)

    if (error.name === 'CastError') { //comprueba si es un cast error, lo que implica ID de objeto no válido para Mongo
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }
    else {
        return response.status(500).send(error.message)
    }
    next(error) //si un error no es captado por este manejador puede ser enviado al middleware siguiente 
}

app.use(errorHandler) //Llamada al middleware de gestion de errores

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`);