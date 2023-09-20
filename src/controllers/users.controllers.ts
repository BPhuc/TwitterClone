import e, { Request, Response,NextFunction } from 'express'
import {ParamsDictionary} from "express-serve-static-core"
import { RegisterReqBody } from '~/models/requests/User.request'
import Users from '~/models/schemas/User.schema'
import usersCollection from '~/services/database.services'
import userServices from '~/services/users.services'


const initUserController = async (req: Request<ParamsDictionary,any,RegisterReqBody>, res : Response,next:NextFunction) => {
        //  throw new Error("ngu qua ban ey")
         const user_id = await userServices.register(req.body)
         res.json({
          data : user_id
         })
}

export default initUserController
