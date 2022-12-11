const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")//loads the mongoose-unique-validator
mongoose.set("strictQuery", true)

const url = process.env.MONGODB_URI

console.log("connecting to", url)

mongoose.connect(url)
  .then(result => {
    console.log("connected to MongoDB",result)
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength:3, unique: true },
  number: { type: String, required: true, minlength:8 },
})
personSchema.plugin(uniqueValidator) //Loads the uniqueValidator into the schema

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema)