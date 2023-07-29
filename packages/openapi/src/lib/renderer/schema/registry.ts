import convert from '@openapi-contrib/json-schema-to-openapi-schema'
import { OpenApiBuilder } from 'openapi3-ts/oas31'
import { ReferenceObject, SchemaObject } from 'openapi3-ts/src/model/openapi31'

export type SchemaRegistryItems = {
  [name: string]: any
}

export class SchemaRegistry {
  private registry: SchemaRegistryItems = {}

  async add(name: string, schema: any) {
    await this.register({ name: schema })
  }

  async register(schemas: SchemaRegistryItems) {
    for (const [name, schema] of Object.entries(schemas)) {
      this.registry[name] = await convert(schema, { dereference: true })
    }
  }

  assertThenRef(name: string, options?: { wrapped?: true }): SchemaObject
  assertThenRef(name: string, options: { wrapped?: false }): ReferenceObject
  assertThenRef(
    name: string,
    options: {
      wrapped?: boolean
    } = {
      wrapped: true,
    },
  ): SchemaObject | ReferenceObject {
    if (!(name in this.registry)) {
      throw new Error(
        `ensuredRef: assertion failed: Schema "${name}" not found`,
      )
    }
    if (!options.wrapped) {
      return { $ref: `#/components/schemas/${name}` }
    }
    return {
      type: 'object',
      properties: {
        code: {
          type: 'integer',
          description: 'Business-level response code',
          example: 0,
        },
        message: {
          type: 'string',
          description: 'Business-level response message',
          example: 'OK',
        },
        data: {
          $ref: `#/components/schemas/${name}`,
        },
      },
      required: ['code', 'message', 'data'],
      description: `Wrapped response of type "${name}"`,
      title: `Wrapped "${name}"`,
    }
  }

  addToBuilder(builder: OpenApiBuilder) {
    Object.entries(this.registry).forEach(([name, schema]) => {
      builder.addSchema(name, schema)
    })
  }
}
