require('pug')

const path = require('path')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const swaggerUiAssetPath = require('swagger-ui-dist').getAbsoluteFSPath()

module.exports = config => {
  const app = express()
  app.set('view engine', 'pug')
  app.set('views', path.resolve(__dirname, 'views'))
  app.use(helmet())
  app.use(morgan('combined'))

  app.use('/assets', express.static('./assets'))
  app.use('/vendor', express.static('./node_modules'))
  app.use('/swagger-ui', express.static(swaggerUiAssetPath))

  app.get('/', (req, res) => {
    const specUrl = req.query['spec-url']
    res.render('index', { config, specUrl })
  })

  return app
}
