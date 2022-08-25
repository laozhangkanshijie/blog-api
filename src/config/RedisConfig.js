import { createClient } from 'redis'
import retryStrategy from 'node-redis-retry-strategy'
import config from './index'

const options = {
  password: config.REDIS.password,
  socket: {
    host: config.REDIS.host,
    port: config.REDIS.port,
    detect_buffers: true,
    reconnectStrategy: retryStrategy()
  }
}

const client = createClient(options)

const initRedis = async () => {
  client.on('error', (err) => console.log('Redis Client Error', err))
  await client.connect()

  client.on('end', function () {
    console.log('redis connection has closed')
  })

  client.on('reconnecting', function (o) {
    console.log('redis client reconnecting', o.attempt, o.delay)
  })
}

const setValue = async (key, value, time) => {
  if (typeof value === 'undefined' || value == null || value === '') {
    return
  }
  if (typeof value === 'string') {
    if (typeof time !== 'undefined') {
      await client.set(key, value, 'EX', time)
    } else {
      await client.set(key, value)
    }
  } else if (typeof value === 'object') {
    Object.keys(value).forEach((item) => {
      client.hSet(key, item, value[item])
    })
    client.hSet(key, value)
  }

  return client.set(key, value)
}

const getValue = async (key) => {
  return await client.get(key)
}

const getHValue = async (key) => {
  return await client.hGetAll(key)
}

export { client, setValue, getValue, getHValue, initRedis }
