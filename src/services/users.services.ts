import Users from '~/models/schemas/User.schema'
import usersCollection from './database.services'
import { RegisterReqBody } from '~/models/requests/User.request'
import { sha256 } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'

export class UserServices {

  private signAccessToken(user_id : string) {
        return signToken({
          payload : {user_id,type:TokenType.AccessToken},
          privateKey : '52d807f04047260979566fba2db0347b5c4d686cc160d82fbda072e59a737b3215f4d4033d170349160d1e9a596f3952a3dd0f91c24f6d384d0f31fff15b9bad',
          options : {expiresIn : process.env.ACCESS_TOKEN_EXPIRES as string}
        })   
  }

  private signRefreshToken(user_id : string) {
    return signToken({
      payload : {user_id,type:TokenType.AccessToken},
      privateKey : '6ca8df30907b0181b4306d7623fe8e417de2485a6240088aed6c16819d487f320b01b5fdefb379f67079a747df19fb7d0b0c5326e3b9786472710d2e65db03bc',
      options : {expiresIn : process.env.REFRESH_TOKEN_EXPIRES as string}
    })   
  }


  async register(payload: RegisterReqBody) {
       const user = await usersCollection.userDB.insertOne(new Users({
             ...payload,
             date_of_birth : new Date(payload.date_of_birth),
             password : sha256(payload.password)
       }))
       console.log("check inline 31 ",user)
       const user_id = (await user).insertedId.toString()
       const[accessToken,refreshToken] = await Promise.all([
          this.signAccessToken(user_id),
          this.signRefreshToken(user_id)
       ])
       console.log('access token ',accessToken)
       console.log('refresh token ',refreshToken)
       return {
         
            accessToken : accessToken,
            refreshToken : refreshToken,
            user : user
          
       }
  }

  async checkEmailExist(email:string) {
    const user = await usersCollection.userDB.findOne({email})
    console.log(user)
    return Boolean(user)
  }
}

const userServices = new UserServices()
export default userServices
