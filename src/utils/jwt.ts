import jwt from "jsonwebtoken"

export const signToken = ({payload,privateKey,options} : {payload:string | object | Buffer, privateKey:string,options:object}) => {
      return new Promise<string>((resolve,reject) => {
            jwt.sign(payload,privateKey,options,(err,token) => {
                  if(err) {
                     throw reject(err)
                  }
                  resolve(token as string)
            });     
      })
}