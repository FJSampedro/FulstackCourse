const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://admin:${password}@cluster0.jodnixc.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url) //mongoose se conecta a mongoDB

const noteSchema = new mongoose.Schema({ //generamos un schema del modelo que vamos a introducir. 
    //esto son los nombres de los datos y sus tipos
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema) //Con el esquema creamos un modelo de mongoose, que sera el que utilizaremos

const note = new Note({  //generamos un objeto de tipo Note con los datos que queremos introducidos
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

// note.save().then(result => { //Enviamos el dato a la base de datos
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({ important: true}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })