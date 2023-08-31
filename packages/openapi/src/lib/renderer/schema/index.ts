import { SchemaRegistry } from './registry'

import GenerateCredByCodeRequestData from './schemas/GenerateCredByCodeRequestData.json'
import GenerateCredByCodeResponseData from './schemas/GenerateCredByCodeResponseData.json'
import GetGamePlayerBindingResponseData from './schemas/GetGamePlayerBindingResponseData.json'
import GetGamePlayerInfoResponseData from './schemas/GetGamePlayerInfoResponseData.json'
import GetGamesResponseData from './schemas/GetGamesResponseData.json'
import PostGameAttendanceRequestData from './schemas/PostGameAttendanceRequestData.json'

export const createDefaultRegistry = async () => {
  const registry = new SchemaRegistry()

  await registry.register({
    GetGamePlayerInfoResponseData,
    GetGamePlayerBindingResponseData,
    GetGamesResponseData,
  })

  await registry.register({
    PostGameAttendanceRequestData,
  })

  await registry.register({
    GenerateCredByCodeRequestData,
    GenerateCredByCodeResponseData,
  })

  return registry
}
