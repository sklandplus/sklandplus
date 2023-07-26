# `@sklandplus` Monorepo

此为 `@sklandplus` npm Organization 下众多 package 的 monorepo。

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- [`packages/openapi`](https://github.com/sklandplus/sklandplus/tree/main/packages/openapi) ([`@sklandplus/openapi`](https://www.npmjs.com/package/@sklandplus/openapi)): A handcrafted OpenAPI 3 schema for Skland API, exported in both JSON and YAML formats.
- [`packages/openapi-hypergryph-as`](https://github.com/sklandplus/sklandplus/tree/main/packages/openapi) ([`@sklandplus/openapi-hypergryph-as`](https://www.npmjs.com/package/@sklandplus/openapi)): A handcrafted OpenAPI 3 schema for HyperGryph AS API (`as.hypergryph.com`, for account-related operations), exported in both JSON and YAML formats.
- [`packages/client`](https://github.com/sklandplus/sklandplus/tree/main/packages/client) ([`@sklandplus/client`](https://www.npmjs.com/package/@sklandplus/client)): A ready-to-use type-safe client, automatically generated from `@sklandplus/openapi` using [`openapi-typescript`](https://github.com/drwpow/openapi-typescript).

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

> These are not packages or apps, but rather utilities that are used by the Turborepo itself.

- `packages/tsconfig`: TypeScript configuration for all packages and apps.
- `packages/eslint-config-custom`: ESLint configuration for all packages and apps.

### Build

To build all apps and packages, run the following command:

```
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn dev
```

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

This project is licensed under the terms of the [MIT license](./LICENSE).
