import { OpenApiBuilder } from 'openapi3-ts/oas31'
import { createDefaultRegistry } from './schema'
import { SharedParams } from './sharedParams'

export const renderDocument = async () => {
  const registry = await createDefaultRegistry()
  const builder = new OpenApiBuilder()
    .addInfo({
      title: 'Skland Unofficial API',
      version: '0.0.1',
      description:
        'This is an unofficial API for Skland. It is not officially supported by Skland and may break at any time.',
      termsOfService: 'https://assets.skland.com/protocols/agreement.html',
    })
    .addServer({
      url: 'https://zonai.skland.com',
    })
    .addHeader('cred', {
      description: "The user's credentials",
      schema: {
        type: 'string',
      },
    })
    .addTag({
      name: 'game',
    })
    .addPath('/api/v1/game/player/info', {
      get: {
        tags: ['game'],
        summary: 'Get Player Detailed Info',
        operationId: 'GetGamePlayerInfo',
        parameters: [SharedParams.uid()],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: registry.assertThenRef('GetGamePlayerInfoResponse'),
              },
            },
          },
        },
      },
    })
    .addPath('/api/v1/game/player/binding', {
      get: {
        tags: ['game'],
        summary: 'Get Player Binding',
        description: "Get the player's binding (Skland ID <-> Game ID) info",
        operationId: 'GetGamePlayerBinding',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: registry.assertThenRef('GetGamePlayerBindingResponse'),
              },
            },
          },
        },
      },
    })

  registry.addToBuilder(builder)

  return builder.rootDoc
}
