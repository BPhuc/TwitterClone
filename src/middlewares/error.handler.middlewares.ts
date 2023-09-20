import express from "express"
import { Request,Response,NextFunction } from "express"
import httpStatus from "~/constants/httpStatus"
import { omit } from "lodash"

export const errorHandler = (error : any,req:Request,res:Response,next:NextFunction) => {
       console.log("cehck inline 7 ",error)
        res.status(error.status || httpStatus.INTERVAL_SERVER_ERROR).json(omit(error,['status']))
     
}