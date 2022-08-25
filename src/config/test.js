// import { client, getValue, setValue } from './ReadisConfig'

// // await client.auth('123456', () => {
// //   console.log('认证通过')
// // })

// await client.connect()

// setValue('zh', 'zh message')

// getValue('zh').then((res) => {
//   console.log('getValue', res)
// })

import { createClient } from 'redis'

const client = createClient({
  url: 'redis://:123456@192.169.1.5:15001'
})

client.on('error', (err) => console.log('Redis Client Error', err))

await client.connect()

await client.set('key', 'value')
const value = await client.get('key')

console.log(value)
