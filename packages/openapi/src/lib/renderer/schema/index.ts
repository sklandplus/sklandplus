import { SchemaRegistry } from './registry'

import GetGamePlayerBindingResponse from './schemas/GetGamePlayerBindingResponse.json'
import GetGamePlayerInfoResponse from './schemas/GetGamePlayerInfoResponse.json'
import GetGamesResponse from './schemas/GetGamesResponse.json'

export const createDefaultRegistry = async () => {
  const registry = new SchemaRegistry()
  await registry.add('GetGamePlayerInfoResponse', GetGamePlayerInfoResponse)
  await registry.add(
    'GetGamePlayerBindingResponse',
    GetGamePlayerBindingResponse,
  )
  await registry.add('GetGamesResponse', GetGamesResponse)
  return registry
}
