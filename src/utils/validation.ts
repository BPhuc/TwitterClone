import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import { ErrorWithStatus } from '~/models/Errors'
import httpStatus from '~/constants/httpStatus'
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validations.run(req)
    const errors = validationResult(req)
    const errorsObject = errors.mapped()
    console.log("check data 14 ",errorsObject)
    // for(const key in errorsObject) {
    //    const {msg} = errorsObject[key]
    //    console.log("check inline 16 ",key)
    //    console.log("check inline 17 ",errorsObject[key])
    //    console.log("check inline 19 ",msg instanceof ErrorWithStatus)
    //    if(msg instanceof ErrorWithStatus && msg.status !== httpStatus.UNPROCESSABLE_ENTITY) {
       
    //     console.log("check inline 18 ",msg)
    //       return next(msg)
    //    }
    // } 
    //neu ko co loi thi next
    if (errors.isEmpty()) {
      return next()
    }
    // res.status(422).json({
    //   errors : errorsObject
    // }) 
    res.status(422).json({
      errors : errors.mapped()
    }) 
   
  }
}
