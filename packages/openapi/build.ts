import fs from 'node:fs/promises'
import path from 'node:path'

import { renderDocument } from './lib/renderer'

async function main() {
  const doc = await renderDocument()
  await fs.writeFile(
    path.join(__dirname, 'lib/schema.ts'),
    `export const schema = ${JSON.stringify({ doc })}`,
  )
}

main()
