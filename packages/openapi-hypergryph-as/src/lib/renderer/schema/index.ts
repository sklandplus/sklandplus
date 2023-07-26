import { SchemaRegistry } from '@sklandplus/openapi/src/lib/renderer/schema/registry'

import GetTokenByPhonePasswordRequestData from './schemas/GetTokenByPhonePasswordRequestData.json'
import GetTokenByPhonePasswordResponseData from './schemas/GetTokenByPhonePasswordResponseData.json'
import OAuthGrantRequestData from './schemas/OAuthGrantRequestData.json'
import OAuthGrantResponseData from './schemas/OAuthGrantResponseData.json'

export const createDefaultRegistry = async () => {
  const registry = new SchemaRegistry()

  await registry.add(
    'GetTokenByPhonePasswordRequestData',
    GetTokenByPhonePasswordRequestData,
  )
  await registry.add(
    'GetTokenByPhonePasswordResponseData',
    GetTokenByPhonePasswordResponseData,
  )

  await registry.add('OAuthGrantRequestData', OAuthGrantRequestData)
  await registry.add('OAuthGrantResponseData', OAuthGrantResponseData)

  return registry
}
