require('pug')

const path = require('path')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const basicAuth = require('basic-auth-connect')
const swaggerUiAssetPath = require('swagger-ui-dist').getAbsoluteFSPath()

module.exports = config => {
  const app = express()
  app.set('view engine', 'pug')
  app.set('views', path.resolve(__dirname, 'views'))

  app.use(helmet())
  app.use(morgan('combined'))

  if (process.env.OPENAPI_SPEC_SERVER_USER && process.env.OPENAPI_SPEC_SERVER_PASSWORD) {
    app.use(basicAuth(process.env.OPENAPI_SPEC_SERVER_USER, process.env.OPENAPI_SPEC_SERVER_PASSWORD))
  }

  app.use('/assets', express.static(path.resolve(__dirname, './assets')))
  app.use(
    '/vendor',
    // dirty trick, but works across different installs
    express.static(path.resolve(path.dirname(require.resolve('document-register-element')), '..', '..'))
  )
  app.use('/swagger-ui', express.static(swaggerUiAssetPath))

  app.get('/', (req, res) => {
    const specUrl = req.query['spec-url']
    res.render('index', { config, specUrl })
  })

  return app
}
