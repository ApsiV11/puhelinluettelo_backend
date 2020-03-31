require('dotenv').config()
const express=require('express')
const morgan=require('morgan')
const cors=require('cors')
const Person=require('./models/person')

const app=express()

app.use(cors())

app.use(express.static('build'))

app.use(express.json())

morgan.token('body', (request) => {
  if(request.method==='POST'){
    return JSON.stringify(request.body)
  }
  else{
    null
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body)'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if(person) {
      response.json(person.toJSON())
    }
    else{
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(person => {
    if (person) {
      response.json(person.toJSON())
    }
    else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body=request.body

  const person = {
    name: body.name,
    number: body.number
  }

  if(person.name.length<2 ||person.number.length<7){
    response.status(403).json({ 'error':
      'Name must be atleast three characters long and number eight characters long',
    'status': 403 })
  }

  else{
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        if(updatedPerson){
          response.json(updatedPerson.toJSON())
        }
        else{
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  }
})

app.post('/api/persons', (request, response, next) => {
  const data=request.body

  if(data.name===null || data.number===null){
    response.status(400).json({ 'error':'Name or number cant be empty' } )
  }

  else{
    const newPerson= new Person({
      name: data.name,
      number: data.number
    })

    newPerson.save().then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
      .catch(error => next(error))
  }
})

app.get('/info', (request, response) => {
  Person.count({}).then(amount => {
    response.send(
      `<div>
          <div>Phonebook has info for ${amount} people </div>
          <div>${new Date()}</div>
        </div>`)
  })
})
const unknownResource= (request, response) => {
  response.status(404).send({ error: 'unknown resource' })
}

app.use(unknownResource)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if(error.name === 'ValidationError') {
    return response.status(403).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})