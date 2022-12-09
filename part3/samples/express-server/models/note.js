const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const noteSchema = new mongoose.Schema({    //Crea un schema de mongoose que nos servira para conectarnos a la BBDD y trabajar con los datos
    content: {              // Podemos definir reglas de validacion directamente en la definicion del schema
        type: String,
        minlength: 5,
        required: true
      },
      date: { 
        type: Date,
        required: true
      },
      important: Boolean
    })

noteSchema.set('toJSON', {                  //modifica el parseado del schema <noteSchema> de mongoose para que se adapte a nuestro frontend
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString() //convierte el objeto <_id> de mongo en un string <id> que nos sirva como id
        delete returnedObject._id                         //elimina los objetos _id(identificador de mongo) y __v(control de versiones de mongo)
        delete returnedObject.__v                         //del objeto recibido desde la BBDD
    }
})

module.exports = mongoose.model('Note', noteSchema)