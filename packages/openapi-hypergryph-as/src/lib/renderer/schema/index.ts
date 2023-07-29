import { SchemaRegistry } from '@sklandplus/openapi/src/lib/renderer/schema/registry'

import GetTokenByPhonePasswordRequestData from './schemas/GetTokenByPhonePasswordRequestData.json'
import GetTokenByPhonePasswordResponseData from './schemas/GetTokenByPhonePasswordResponseData.json'
import OAuthGrantRequestData from './schemas/OAuthGrantRequestData.json'
import OAuthGrantResponseData from './schemas/OAuthGrantResponseData.json'
import {
  SendPhoneCodeRequestData,
  SendPhoneCodeResponseData,
  SendPhoneCodeCaptchaResponseData,
} from './schemas/SendPhoneCodeData'

export const createDefaultRegistry = async () => {
  const registry = new SchemaRegistry()

  await registry.register({
    GetTokenByPhonePasswordRequestData,
    GetTokenByPhonePasswordResponseData,
    OAuthGrantRequestData,
    OAuthGrantResponseData,
    SendPhoneCodeRequestData,
    SendPhoneCodeResponseData,
    SendPhoneCodeCaptchaResponseData,
  })

  return registry
}
