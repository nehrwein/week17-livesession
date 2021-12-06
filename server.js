import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data/tech_fundings.json' 


// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const users = [
  {id: 1, name: 'Alice', age: 33},
  {id: 2, name: 'Birgit', age: 44},
  {id: 3, name: 'Jessi', age: 56},
  {id: 4, name: 'Tom', age: 78}
]

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello Birgit')
})

app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/companies', (req, res) => {
  const companies = data.map(item => item.Company)
  res.json(companies)
})

app.get('/companiesspain', (req, res) => {
  const region = data.filter(item => item.Region === 'Spain')
  const companies = region.map(item => item.Company)
  res.json(companies)
})

//get a specific company
app.get('/fundings/:index', (req, res) => {
  const { index } = req.params

  const companyId = data.find(company => company.index === +index)

  if (!companyId) {
    res.status(404).send('No company found, that matches this ID')
  } else {
    res.json(companyId)
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
