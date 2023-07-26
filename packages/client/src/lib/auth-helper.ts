import { client } from './client'
import { client as clientHa } from './client-hypergryph-as'
import { operations } from './api/v0'
import { operations as operationsHa } from './api-hypergryph-as/v0'

type PhonePasswordCredential = {
  phone: string
  password: string
}

type AuthorizeResult =
  | {
      data: operations['GenerateCredByCode']['responses']['200']['content']['application/json']
      error: undefined
    }
  | {
      data: undefined
      error:
        | operationsHa['GetTokenByPhonePassword']['responses']['200']['content']['application/json'] // 注：即便账号或密码错误，该接口也会返回 200 OK。
        | operationsHa['OAuthGrant']['responses']['401']['content']['application/json']
        | operations['GenerateCredByCode']['responses']['401']['content']['application/json']
        | operations['GenerateCredByCode']['responses']['403']['content']['application/json']
        | any
    }

export async function authorize(
  credential: PhonePasswordCredential,
): Promise<AuthorizeResult> {
  const tokenResp = await clientHa.post(
    '/user/auth/v1/token_by_phone_password',
    {
      body: credential,
    },
  )
  // 注：即便账号或密码错误，该接口也会返回 200 OK。
  if (tokenResp.data && !tokenResp.data.data) {
    return { data: undefined, error: tokenResp.data }
  }
  if (tokenResp.error) {
    return tokenResp
  }
  const grantResp = await clientHa.post('/user/oauth2/v2/grant', {
    body: {
      token: tokenResp.data.data.token,
      appCode: '4ca99fa6b56cc2ba',
      type: 0,
    },
  })
  if (grantResp.error) {
    return grantResp
  }
  return await client.post('/api/v1/user/auth/generate_cred_by_code', {
    body: {
      code: grantResp.data.data.code,
      kind: 1,
    },
  })
}
