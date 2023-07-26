import { SchemaRegistry } from './registry'

import GetGamePlayerBindingResponseData from './schemas/GetGamePlayerBindingResponseData.json'
import GetGamePlayerInfoResponseData from './schemas/GetGamePlayerInfoResponseData.json'
import GetGamesResponseData from './schemas/GetGamesResponseData.json'

import GenerateCredByCodeRequestData from './schemas/GenerateCredByCodeRequestData.json'
import GenerateCredByCodeResponseData from './schemas/GenerateCredByCodeResponseData.json'

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

  await registry.add(
    'GenerateCredByCodeRequestData',
    GenerateCredByCodeRequestData,
  )
  await registry.add(
    'GenerateCredByCodeResponseData',
    GenerateCredByCodeResponseData,
  )

  return registry
}
