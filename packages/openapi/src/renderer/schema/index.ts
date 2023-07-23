import { SchemaRegistry } from 'renderer/schema/registry'

import GetGamePlayerBindingResponse from './schemas/GetGamePlayerBindingResponse.json'
import GetGamePlayerInfoResponse from './schemas/GetGamePlayerInfoResponse.json'

export const createDefaultRegistry = async () => {
  const registry = new SchemaRegistry()
  await registry.add('GetGamePlayerInfoResponse', GetGamePlayerInfoResponse)
  await registry.add(
    'GetGamePlayerBindingResponse',
    GetGamePlayerBindingResponse,
  )
  return registry
}
