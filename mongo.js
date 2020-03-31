/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length!==3 && process.argv.length!==5) {
  console.log('give password as argument')
  console.log('optionally give also person name and number to save')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@fullstack-kurssi-uhp8k.mongodb.net/people?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length===3){
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })

  console.log('phonebook:')
}

if(process.argv.length===5){
  const person= new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(() => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}