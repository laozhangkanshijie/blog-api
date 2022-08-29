// import { setValue } from '@/config/RedisConfig'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
// import moment from 'dayjs'
import config from '@/config/index'
import { checkCode } from '@/common/Utils'
import UserModel from '@/model/User'

class LoginController {
  async login(ctx) {
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    const result = await checkCode(sid, code)
    if (result) {
      let checkUserPasswrod = false
      const user = await UserModel.findOne({ username: body.username })
      if (user === null) {
        ctx.body = {
          code: 404,
          msg: '用户名或者密码错误'
        }
        return
      }
      if (user.password === body.password) {
        checkUserPasswrod = true
      }
      if (checkUserPasswrod) {
        const token = jsonwebtoken.sign({ _id: 'brian' }, config.JWT_SECRET, { expiresIn: '1d' })
        ctx.body = {
          code: 200,
          token
        }
      } else {
        ctx.body = {
          code: 404,
          msg: '用户名或者密码错误'
        }
      }
    } else {
      ctx.body = {
        code: 401,
        msg: '图片验证码不正确，请检查'
      }
    }
  }

  async reg(ctx) {
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    const msg = {}
    const result = await checkCode(sid, code)
    let check = true
    if (result) {
      const user1 = await UserModel.findOne({ username: body.username })
      if (user1 !== null && typeof user1.username !== 'undefined') {
        msg.username = ['此邮箱已经注册，可以通过邮箱找回密码']
        check = false
      }
      const user2 = await UserModel.findOne({ name: body.name })
      if (user2 !== null && typeof user2.name !== 'undefined') {
        msg.username = ['此昵称已经被注册，请修改']
        check = false
      }
      if (check) {
        body.password = await bcrypt.hash(body.password, 5)
        const user = new UserModel({
          username: body.username,
          name: body.name,
          password: body.password
        })
        const result = await user.save()
        ctx.body = {
          code: 200,
          data: result,
          msg: '注册成功'
        }
        return
      }
    } else {
      msg.code = ['验证码已经失效， 请重新获取！']
    }
    ctx.body = {
      code: 500,
      msg
    }
  }
}

export default new LoginController()
