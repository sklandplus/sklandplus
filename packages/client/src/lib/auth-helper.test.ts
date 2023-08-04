import { describe, expect, test } from '@jest/globals'
import { authorize } from './auth-helper'

const TEST_PHONE: string = process.env.TEST_PHONE!
const TEST_PASSWORD: string = process.env.TEST_PASSWORD!

const WRONG_PHONE = '11112345678'
const WRONG_PASSWORD = 'Miku3939'

describe('auth-helper', () => {
  test('authorize successful', async () => {
    const result = await authorize({
      phone: TEST_PHONE,
      password: TEST_PASSWORD,
    })
    console.debug(result)
    expect(result.data?.data?.cred).toBeTruthy()
    expect(result.data?.data?.userId).toBeTruthy()
    expect(result.error).toBeFalsy()
  })
  test('authorize wrong phone & password', async () => {
    const result = await authorize({
      phone: WRONG_PHONE,
      password: WRONG_PASSWORD,
    })
    console.debug(result)
    expect(result.error).toBeTruthy()
    expect(result.error.status).toBe(100)
    expect(result.error.type).toBe('C1')
    expect(result.data).toBeFalsy()
  })
  test('authorize wrong password', async () => {
    const result = await authorize({
      phone: TEST_PHONE,
      password: WRONG_PASSWORD,
    })
    console.debug(result)
    expect(result.error).toBeTruthy()
    expect(result.error.status).toBe(100)
    expect(result.error.type).toBe('C1')
    expect(result.data).toBeFalsy()
  })
})
