// const Koa = require('koa')
import path from 'path'
import Koa from 'koa'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import jsonutil from 'koa-json'
import statics from 'koa-static'
import helmet from 'koa-helmet'
import compose from 'koa-compose'
import compress from 'koa-compress'
import JWT from 'koa-jwt'

import router from './routes/routes'
import config from '@/config/index'
import errorHandle from '@/common/ErrorHandle'

import { initRedis } from '@/config/RedisConfig'

const app = new Koa()

const isDevMode = process.env.NODE_ENV !== 'production'

const jwt = JWT({ secret: config.JWT_SECRET }).unless({ path: [/^\/public/, /\/login/] })

const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  jsonutil({ pretty: false, param: 'pretty' }),
  helmet(),
  errorHandle,
  jwt
])

if (!isDevMode) {
  app.use(compress())
}

// const router = new Router()

// router.prefix('/api') //前端所有请求需要加上api

// router.post('/post', async (ctx) => {
//   let {body} = ctx.request
//   console.log(body)
//   ctx.body = {
//     ...body
//   }
// })

app.use(middleware)
app.use(router())

app.listen(3000, () => {
  initRedis()
})
