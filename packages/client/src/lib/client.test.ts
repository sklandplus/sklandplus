import { beforeAll, describe, expect, test } from '@jest/globals'
import { authorize } from './auth-helper'
import { client } from './client'
import * as util from 'util'

const TEST_PHONE: string = process.env.TEST_PHONE!
const TEST_PASSWORD: string = process.env.TEST_PASSWORD!

let CRED = ''

beforeAll(async () => {
  CRED = await authorize({ phone: TEST_PHONE, password: TEST_PASSWORD }).then((resp) => resp.data!.data.cred)
})

describe('client', () => {
  test('GetGamePlayer *', async () => {
    const bindingResponse = await client.get('/api/v1/game/player/binding', { headers: { cred: CRED } })
    console.info(util.inspect(bindingResponse, { depth: null, colors: true }))
    expect(bindingResponse.error).toBeFalsy()
    for (const app of bindingResponse.data!.data.list) {
      for (const binding of app.bindingList) {
        const infoResponse = await client.get('/api/v1/game/player/info', {
          params: { query: { uid: binding.uid } },
          headers: { cred: CRED },
        })
        console.info(util.inspect(infoResponse, { depth: null, colors: true }))
        expect(infoResponse.error).toBeFalsy()
      }
    }
  })
})
