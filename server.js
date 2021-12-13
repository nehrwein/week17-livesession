import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import techFundings from './data/tech_fundings.json'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/livession-mongo'
mongoose.connect(mongoUrl, {useNewUrlParser:true, useUnifiedTopology: true})
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

//start by creating a model for the DB
const Company = mongoose.model('Company', {
  index: Number,
  company: String,
  website: String,
  region: String,
  vertical: String,
  fundingAmountUSD: Number,
  fundingStage: String,
  fundingDate: String,
})

//seeding the DB only when typing this RESET_DB-variable in the Terminal. Should only be used, when you are setting a project up. Otherwise alll Userdata is gone!!!
//$ RESET_DB=true npm run dev
if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    await  Company.deleteMany({}) //deletes all content from the DB
    techFundings.forEach(item => {
      const newCompany = new Company(item)
      newCompany.save()
    })
  } 
  seedDatabase()
}

//saving the created Users to the database
/* newUser.save()
newUser2.save() */

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello Birgit')
})

//test
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
