import express from 'express'
import { renderDocument } from 'renderer'
import swaggerUi from 'swagger-ui-express'

async function main() {
  const app = express()
  const document = await renderDocument()
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(document))
  app.listen(3000, () => {
    console.log('Listening on port 3000')
  })
}

main()
