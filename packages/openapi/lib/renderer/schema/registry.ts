import refParser from '@apidevtools/json-schema-ref-parser'

// @ts-ignore
import toOpenApi from 'json-schema-to-openapi-schema'
import { OpenApiBuilder } from 'openapi3-ts/oas31'

export interface SchemaRegistryItem {
  name: string
  schema: any
}

const openapiSchemaFromJsonSchema = async (schema: any) => {
  const parser = new refParser()
  const parsedSchema = await parser.dereference(schema)
  const converted = toOpenApi(parsedSchema, {
    dereference: {
      circular: false,
    },
  })
  delete converted.definitions
  return converted
}

export class SchemaRegistry {
  private registry: SchemaRegistryItem[] = []

  async add(name: string, schema: any) {
    this.registry.push({
      name,
      schema: await openapiSchemaFromJsonSchema(schema),
    })
  }

  assertThenRef(name: string) {
    const found = this.registry.find((item) => item.name === name)
    if (!found) {
      throw new Error(
        `ensuredRef: assertion failed: Schema "${name}" not found`,
      )
    }
    return { $ref: `#/components/schemas/${name}` }
  }

  addToBuilder(builder: OpenApiBuilder) {
    this.registry.forEach(({ name, schema }) => {
      builder.addSchema(name, schema)
    })
  }
}
