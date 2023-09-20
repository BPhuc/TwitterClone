import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'
import userServices from '~/services/users.services'
import { ErrorWithStatus } from '~/models/Errors'


export const registerValidator = validate(
  checkSchema({
    email: {
      notEmpty: true,
      trim: true,
      isString: true,
      isEmail: true,
      isLength: {
        options: {
          min: 3,
          max: 100
        }
      },
      custom : {
        options : async (value) => {
           const isExistEmail = await userServices.checkEmailExist(value)
           if(isExistEmail) {
             throw new ErrorWithStatus({message : "Email already exists", status : 401})
           }
           return true
        }
      }
    },
    name: {
      notEmpty: true,
      trim: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 255
        }
      }
    },
    password: {
      notEmpty: true,
      trim: true,
      isString: true,
      isLength: {
        options: {
          min: 8,
          max: 255
        }
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        }
      }
    },
    confirmpassword: {
      notEmpty: true,
      trim: true,
      isString: true,
      isLength: {
        options: {
          min: 8,
          max: 255
        }
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        }
      },
      custom: {
        options: (value, { req }) => {
          if (value != req.body.password) {
            throw new Error('Password confirmation does not match password')
          }
          return true
        }
      }
    },
    date_of_birth: {
      notEmpty: true,
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
