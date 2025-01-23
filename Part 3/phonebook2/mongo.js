const mongoose = require('mongoose')

const password = process.argv[2]
let name, number

const url = `mongodb+srv://phonebook:${password}@phonebook.3nvyw.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Phonebook`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)


if (process.argv.length < 3) {
  console.log('give password as argument and/or pass a name and number as arguments')
  process.exit(1)
} else if (process.argv.length > 3) {
  name = process.argv[3]
  number = process.argv[4]

  if (name && number) {
    const person = new Person({
      name: name,
      number: number,
    })

    person.save().then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
  }
} else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
      mongoose.connection.close()
    })
  })
}










