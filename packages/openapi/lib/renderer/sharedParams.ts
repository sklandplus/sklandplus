import { merge } from 'lodash-es'
import { ParameterObject } from 'openapi3-ts/oas31'

export const SharedParams = {
  uid: (override: Partial<ParameterObject> = {}) =>
    merge(
      {
        name: 'uid',
        in: 'query',
        description:
          'The *character* ID (角色 ID), different from the user ID and is different for each "game server" combination.',
        required: true,
        schema: {
          type: 'string',
          pattern: '^\\d+$',
        },
      },
      override,
    ),
}
