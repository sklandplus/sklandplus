import { SchemaRegistry } from './registry'

import GetGamePlayerBindingResponseData from './schemas/GetGamePlayerBindingResponseData.json'
import GetGamePlayerInfoResponseData from './schemas/GetGamePlayerInfoResponseData.json'
import GetGamesResponseData from './schemas/GetGamesResponseData.json'

import GenerateCredByCodeRequestData from './schemas/GenerateCredByCodeRequestData.json'
import GenerateCredByCodeResponseData from './schemas/GenerateCredByCodeResponseData.json'

export const createDefaultRegistry = async () => {
  const registry = new SchemaRegistry()

  await registry.register({
    GetGamePlayerInfoResponseData,
    GetGamePlayerBindingResponseData,
    GetGamesResponseData,
  })

  await registry.register({
    GenerateCredByCodeRequestData,
    GenerateCredByCodeResponseData,
  })

  return registry
}
