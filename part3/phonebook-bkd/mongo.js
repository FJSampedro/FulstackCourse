const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://admin:${password}@cluster0.jodnixc.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log(result)
    mongoose.connection.close()
    process.exit(1)
  })
}
else {

  if (process.argv.length < 4) {
    console.log('Please provide the name as an argument: node mongo.js <password> <name> <number>')
    process.exit(1)
  }

  if (process.argv.length < 5) {
    console.log('Please provide the number as an argument: node mongo.js <password> <name> <number>')
    process.exit(1)
  }
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })

}
