import createClient from 'openapi-fetch'
import { paths } from './api-hypergryph-as/v0'

export const client = createClient<paths>({
  baseUrl: 'https://as.hypergryph.com',
})
