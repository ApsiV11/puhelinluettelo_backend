const express=require('express')
const morgan=require('morgan')
const cors=require('cors')

const app=express()

app.use(cors())

app.use(express.json())

morgan.token('body', (request, response) => {
  if(request.method==="POST"){
    return JSON.stringify(request.body)
  }
  else{
      null
  }
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id=Number(request.params.id)
    const person=persons.find(person => person.id===id)
    if(person===undefined){
      response.status(404).end()
    }
    else{
      response.json(person)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id=Number(request.params.id)
    persons=persons.filter(person => person.id!==id)

    response.status(204).end()

})

app.post('/api/persons', (request, response) => {
    const data=request.body
    
    if(data.name===null || data.number===null){
        response.status(400).json({"error":"Name or number can't be empty"})
    }

    if(persons.findIndex((person) =>
      person.name===String(data.name)
      )!==-1){
        response.status(403).json({"error":"Name already exists in the phonebook"})
    }

    else{
        const newPerson={
            name: data.name,
            number: data.number,
            id: Math.floor(Math.random()*10000)
        }

        persons=persons.concat(newPerson)

        response.json(newPerson)
    }
})

app.get('/info', (request, response) => {
    response.send(
      `<div>
         <div>Phonebook has info for ${persons.length} people </div>
         <div>${new Date()}</div>
       </div>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})