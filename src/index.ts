import express from 'express'
const app = express()
import 'dotenv/config'
import bodyParser from 'body-parser'
import initUserRouter from './routes/users.routes'
import usersCollection from './services/database.services'
import session from 'express-session'
import crypto from 'crypto'
import { errorHandler } from './middlewares/error.handler.middlewares'
import userServices from './services/users.services'
console.log("checck inline 11 ",userServices)

const PORT = process.env.PORT
const router = express.Router()

//init middleware session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
)

//init middleware body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//init middleware user
initUserRouter(app)
//init middleware error handler
app.use(errorHandler)

//connect DB
usersCollection.connect()

//check registerValidate

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
