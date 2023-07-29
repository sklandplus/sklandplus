import fs from 'node:fs/promises'
import path from 'node:path'
import yaml from 'yaml'

import { renderDocument } from './src/lib/renderer'

async function main() {
  await fs.rm('./build-intermediate', { recursive: true, force: true })
  await fs.mkdir('./build-intermediate', { recursive: true })
  const doc = await renderDocument()
  await fs.writeFile(
    path.join(__dirname, 'build-intermediate/schema.ts'),
    `export const schema = ${JSON.stringify({ doc })}`,
  )
  await fs.writeFile(path.join(__dirname, 'build-intermediate/schema.yaml'), yaml.stringify(doc))
  await fs.writeFile(path.join(__dirname, 'build-intermediate/schema.json'), JSON.stringify(doc))
}

main()
