import {
  OpenApiBuilder,
  OperationObject,
  ResponsesObject,
} from 'openapi3-ts/oas31'
import packageJson from '../../../package.json'
import { createDefaultRegistry } from './schema'
import { SharedParams } from './sharedParams'

const SharedOperationMixin: Record<string, () => Partial<OperationObject>> = {
  authenticated: () => ({
    security: [
      {
        cred: [],
      },
    ],
  }),
}

const SharedResponseMixin: Record<string, Partial<ResponsesObject>> = {
  401: {
    description: 'Unauthorized',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              description: 'Error code',
              example: 10001,
            },
            message: {
              type: 'string',
              description: 'Error message',
              example: '用户未登录',
            },
          },
          required: ['code', 'message'],
        },
      },
    },
  },
}

export const renderDocument = async () => {
  const registry = await createDefaultRegistry()
  const builder = new OpenApiBuilder()
    .addInfo({
      title: 'Skland Unofficial API',
      version: packageJson.version,
      description:
        'This is an unofficial API for Skland. It is not officially supported by Skland and may break at any time.',
      termsOfService: 'https://assets.skland.com/protocols/agreement.html',
    })
    .addServer({
      url: 'https://zonai.skland.com',
      description: 'Skland',
    })
    .addHeader('cred', {
      description: "The user's credentials",
      schema: {
        type: 'string',
      },
    })
    .addSecurityScheme('cred', {
      type: 'apiKey',
      name: 'cred',
      description: "User's credential token",
      in: 'header',
    })
    .addTag({
      name: 'game',
      description: 'Game-related Operations',
    })
    .addPath('/api/v1/game', {
      get: {
        tags: ['game'],
        summary: 'Get Current Available Games',
        operationId: 'GetGames',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: registry.assertThenRef('GetGamesResponseData'),
              },
            },
          },
        },
      },
    })
    .addPath('/api/v1/game/player/info', {
      get: {
        ...SharedOperationMixin.authenticated(),
        tags: ['game'],
        summary: 'Get Player Detailed Info',
        operationId: 'GetGamePlayerInfo',
        parameters: [SharedParams.uid()],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: registry.assertThenRef('GetGamePlayerInfoResponseData'),
              },
            },
          },
          ...SharedResponseMixin,
        },
      },
    })
    .addPath('/api/v1/game/player/binding', {
      get: {
        ...SharedOperationMixin.authenticated(),
        tags: ['game'],
        summary: 'Get Player Binding',
        description: "Get the player's binding (Skland ID <-> Game ID) info",
        operationId: 'GetGamePlayerBinding',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: registry.assertThenRef(
                  'GetGamePlayerBindingResponseData',
                ),
              },
            },
          },
          ...SharedResponseMixin,
        },
      },
    })

  registry.addToBuilder(builder)

  return builder.rootDoc
}
