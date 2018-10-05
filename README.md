# fastify-typescript-request-schema

Automatically generated typescript types from json response/request schemas written for [fastify](https://www.fastify.io/)

## Installation

```
npm install --save @salecycle/fastify-typescript-request-schema
```

## Usage

The package currently takes one command, which is a glob that locates the schema files to be transformed.

This package acts as a command, as such it's easiest just to add the call to the `scripts` section of your package json.

So, given that all my fastify json schema files are called `schema.json` I can add the following to the `scripts` section of my `package.json` to allow me to generate the typescript files:

`"generateTypes": "fastify-typescript-request-schema \"src/**/schema.json\""`

then running `npm run generateTypes` will result in `schema.ts` files being created in the same directory as the associated `schema.json` file.
