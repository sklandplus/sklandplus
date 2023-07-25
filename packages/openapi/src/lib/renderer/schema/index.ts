import { SchemaRegistry } from './registry'

import GetGamePlayerBindingResponseData from './schemas/GetGamePlayerBindingResponseData.json'
import GetGamePlayerInfoResponseData from './schemas/GetGamePlayerInfoResponseData.json'
import GetGamesResponseData from './schemas/GetGamesResponseData.json'

export const createDefaultRegistry = async () => {
  const registry = new SchemaRegistry()
  await registry.add(
    'GetGamePlayerInfoResponseData',
    GetGamePlayerInfoResponseData,
  )
  await registry.add(
    'GetGamePlayerBindingResponseData',
    GetGamePlayerBindingResponseData,
  )
  await registry.add('GetGamesResponseData', GetGamesResponseData)
  return registry
}
