# `@sklandplus` Monorepo

此为 `@sklandplus` npm Organization 下众多 package 的 monorepo。

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `packages/openapi`: A handcrafted OpenAPI 3 schema for Skland API, exported in both JSON and YAML formats.
- `packages/client`: A TypeScript client based on `unfetch` for the Skland API.

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
