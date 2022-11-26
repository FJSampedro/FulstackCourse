const express = require("express")
const app = express()
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

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }

]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id)) //el operador spread (...obj) tambien sirve para los arrays, lo que hace es desmontar el objeto en sus componentes
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})
 
app.use(unknownEndpoint) //llamada al middleware que gestiona un endpoint desconocido

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`);