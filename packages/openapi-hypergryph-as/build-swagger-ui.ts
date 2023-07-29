import fs from 'fs/promises'
import path from 'path'
// @ts-ignore
import swaggerUi from 'swagger-ui-dist'
import { renderDocument } from './src/lib/renderer'

async function main() {
  await fs.rm('./dist', { recursive: true, force: true })

  const document = await renderDocument() // now the openapi 3 document is available at `document` as a Record<string, any>

  // Copy swagger-ui static files to dist folder
  await fs.mkdir('./dist', { recursive: true })

  // Write the openapi document to a json file
  await fs.writeFile('./dist/openapi.json', JSON.stringify(document, null, 2))

  // Read all files from swagger-ui-dist
  const files = await fs.readdir(swaggerUi.absolutePath())

  // Copy each file to the dist directory
  for (const file of files) {
    if (file.endsWith('.map') || ['package.json', 'NOTICE', 'README.md', 'LICENSE', 'absolute-path.js'].includes(file))
      continue
    await fs.copyFile(path.join(swaggerUi.absolutePath(), file), `./dist/${file}`)
  }

  // Update index.html to load our openapi.json
  let swaggerInitializer = await fs.readFile('./dist/swagger-initializer.js', 'utf8')
  swaggerInitializer = swaggerInitializer.replace('https://petstore.swagger.io/v2/swagger.json', './openapi.json')
  await fs.writeFile('./dist/swagger-initializer.js', swaggerInitializer)
}

main()
