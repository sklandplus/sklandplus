import createClient from 'openapi-fetch'
import { paths } from './api/v0'

export const client = createClient<paths>({
  baseUrl: 'https://zonai.skland.com',
})
