#!/usr/bin/env node

require('dotenv').config()

const path = require('path')

const configPath = path.join(process.cwd(), 'openapi-spec-config.js')
let config

try {
  config = require(configPath)
} catch (e) {
  config = {}
}

const app = require(path.resolve(__dirname, '../index.js'))(config)

const port = process.env.PORT

if (!port) {
  throw new Error('OpenAPI-Spec-Server:: No PORT given', 'please provide a port via process.ENV')
}

app.listen(port, () => {
  console.log(`OpenAPI Spec Server started at PORT ${port}`)
})
