require('pug')

const path = require('path')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const slug = require('slug')

const util = require('./lib/util.js')

const swaggerUiAssetPath = require('swagger-ui-dist').getAbsoluteFSPath()

module.exports = config => {
  const app = express()
  app.set('view engine', 'pug')
  app.set('views', path.resolve(__dirname, 'views'))

  app.use(helmet())
  app.use(morgan('combined'))

  app.use('/assets', express.static(path.resolve(__dirname, './assets')))

  const specPath = path.join(process.cwd(), 'specs')

  if (util.pathExistsAndIsDir(specPath)) {
    app.use('/specs', express.static(specPath))
  }

  app.use(
    '/vendor',
    // dirty trick, but works across different installs
    express.static(path.resolve(path.dirname(require.resolve('document-register-element')), '..', '..'))
  )
  app.use('/swagger-ui', express.static(swaggerUiAssetPath))

  app.get('/', (req, res) => {
    const specUrl = req.query['spec-url']
    res.render('index', { slug, config, specUrl })
  })

  return app
}
