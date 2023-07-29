export const SendPhoneCodeRequestData = {
  $schema: 'https://json-schema.org/draft/2019-09/schema',
  type: 'object',
  required: ['phone', 'type'],
  properties: {
    phone: {
      type: 'string',
      description: '鹰角网络通行证绑定的手机号码',
      examples: ['13012345678'],
    },
    type: {
      const: 1,
      description: '（未知）',
    },
    captcha: {
      type: 'object',
      description: '若上一次该操作的响应要求输入验证码，' + '则该次操作的请求需要携带这些验证后的验证码参数。',
      required: ['geetest_challenge', 'geetest_validate', 'geetest_seccode'],
      properties: {
        geetest_challenge: {
          type: 'string',
          examples: ['29e68c3a6b3be4c4ad4743ef53fc0d6beb'],
        },
        geetest_validate: {
          type: 'string',
          examples: ['4474c7fb489d6907bc56bb4b72729b5f'],
        },
        geetest_seccode: {
          type: 'string',
          examples: ['4474c7fb489d5907bc56bb4b72720b5f|jordan'],
        },
      },
    },
  },
}

export const SendPhoneCodeResponseData = {
  $schema: 'https://json-schema.org/draft-07/schema',
  type: 'object',
  description: '若操作成功则返回空对象。',
  required: [],
  properties: {},
  examples: [],
}
export const SendPhoneCodeCaptchaResponseData = {
  $schema: 'https://json-schema.org/draft-07/schema',
  type: 'object',
  description:
    '若操作要求输入验证码，则返回极验验证码参数。' +
    '验证方法可参考：https://docs.geetest.com/sensebot/deploy/client/web。' +
    '验证完毕后，需要重新操作，并在请求中携带验证后的验证码参数。',
  required: ['captcha'],
  properties: {
    captcha: {
      type: 'object',
      required: ['success', 'challenge', 'gt', 'new_captcha'],
      properties: {
        success: {
          type: 'integer',
          examples: [1],
        },
        challenge: {
          type: 'string',
          examples: ['82247ab6116801d31b4ae6c3c227672f'],
        },
        gt: {
          type: 'string',
          examples: ['83594bc21b4cdbfd7b3ce45226698113'],
        },
        new_captcha: {
          type: 'boolean',
          examples: [true],
        },
      },
    },
  },
}
