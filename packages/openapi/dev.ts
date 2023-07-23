import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { renderDocument } from './lib/renderer'

async function main() {
  const app = express()
  const document = await renderDocument()
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(document))
  app.listen(3000, () => {
    console.log('Listening on port 3000')
  })
}

main()
