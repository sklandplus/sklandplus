export const GetTokenByPhoneCodeRequestData = {
  $schema: 'https://json-schema.org/draft-07/schema',
  type: 'object',
  required: ['phone', 'code'],
  properties: {
    phone: {
      type: 'string',
      description: '鹰角网络通行证绑定的手机号码',
      examples: ['13012345678'],
    },
    code: {
      type: 'string',
      description: '登录验证码',
      examples: ['393939'],
    },
  },
  examples: [],
}

export const GetTokenByPhoneCodeResponseData = {
  $schema: 'https://json-schema.org/draft-07/schema',
  type: 'object',
  required: ['token'],
  properties: {
    token: {
      type: 'string',
      description: '鹰角网络通行证 token。注：提供的例子已经过脱敏处理',
      examples: ['w2g/hGowTggldJREt333UyIM'],
    },
  },
  examples: [],
}
