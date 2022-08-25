import svgCaptcha from 'svg-captcha'

import { setValue } from '@/config/RedisConfig'

class PublicController {
  async getCaptcha(ctx) {
    const body = ctx.request.query
    console.log(body)

    const newCaptca = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1il',
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 150,
      height: 50
    })
    // 验证码有效时间秒。
    setValue(body.sid, newCaptca.text, 10 * 60)
    // const res = await getValue(body.sid)
    // console.timeLog(res)
    ctx.body = {
      code: 200,
      data: newCaptca.data
    }
  }
}

export default new PublicController()
