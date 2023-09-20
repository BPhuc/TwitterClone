import express, { Application } from 'express'
import initUserController from '~/controllers/users.controllers'
import { checkSchema } from 'express-validator'
import { registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const router = express.Router()
const initUserRouter = async (app: Application) => {
  /**
   * Description: Register new a user
   * Path: /register
   * Method: POST
   * Body: {name:string,email:string,password:string,confirm password,date_of_birth:ISO8601}
   */
  router.post('/register',registerValidator,wrapRequestHandler(initUserController))
  app.use('/users', router)
}

export default initUserRouter
