# `@sklandplus/openapi`

This package is used to generate the OpenAPI 3.1 schema for the API. Users who wish to use the API directly should refer to the [`@sklandplus/client`](../client/README.md) package instead.

## Usage

```typescript
import { schema } from '@sklandplus/openapi'

console.log(schema)
```

## Contributing

### How to add a new API operation

1. Put response body into a JSON -> JSON Schema converter, such as [Quicktype](https://app.quicktype.io/).
2. Copy the generated schema into `src/lib/renderer/schema/schemas/${operationName}Response.json`.
3. Make sure the schema has a top-level definition. Quicktype, for example, have the issue where it only outputs `definitions` without a top-level `type` and (`properties` or `items`) definition. Typically, you should just simply copy the first `definition` object into the top-level of the schema. If the schema have a top-level `type` and (`properties` or `items`) definition, you are good to go.
4. Add the schema to `src/lib/renderer/schema/index.ts`.
5. Add the operation to `src/lib/renderer/index.ts`. Make sure you are using `registry.assertThenRef` to reference the schema.
6. After you are done, run `yarn dev` to start a Swagger UI server locally and check if everything looks good.
