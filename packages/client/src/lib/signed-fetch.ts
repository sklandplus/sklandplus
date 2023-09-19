import hmacSHA256 from 'crypto-js/hmac-sha256'
import md5 from 'crypto-js/md5'

class SignedFetch {
  private static readonly DEFAULT_PERSISTANCE_KEYS = {
    SECRET: 'secret',
  }

  constructor(public options: SignedFetchOptions) {}

  private async getSecret(): Promise<string> {
    if (typeof this.options.secret === 'function') {
      return this.options.secret()
    } else if (typeof this.options.secret === 'string') {
      return this.options.secret
    } else {
      throw new Error('secret not provided: please provide a secret or a function that provides one.')
    }
  }

  private getSignature({
    path,
    query,
    platform,
    deviceId,
    versionName,
    secret,
  }: {
    path: string
    query: string
    platform: string
    deviceId: string
    versionName: string
    secret: string
  }) {
    const timestamp = Math.floor(Date.now() / 1000 - 1) // - 1: remote server is very strict on timestamp, so we need to make sure that by the time our request reaches the server, the timestamp is still within the valid range
    const timestampString = timestamp.toString()
    // the reason of using a very ugly string template is to avoid potential json serialization key order issues.
    // yes i know you would be able to put the keys in order by putting them into the object one by one,
    // but ECMA spec does not guarantee that the order of keys in an object is the same as the order they are put in
    // and doing such leaves potential significant pattern for remote servers to detect us, if this implementation detail
    // is ever changed in the future.
    const concatenated =
      path +
      query +
      timestampString +
      `{"platform":"${platform}","timestamp":"${timestampString}","dId":"${deviceId}","vName":"${versionName}"}`

    const presign = hmacSHA256(concatenated, secret).toString()
    const sign = md5(presign).toString()

    return { timestamp, sign }
  }

  async fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const request = new Request(input, init)
    const url = new URL(request.url)

    const { timestamp, sign } = this.getSignature({
      path: url.pathname,
      query: url.search.slice(1), // remove the leading `?`
      platform: request.headers.get('platform') ?? '',
      deviceId: request.headers.get('did') ?? '',
      versionName: request.headers.get('vname') ?? '',
      secret: await this.getSecret(),
    })

    request.headers.set('timestamp', timestamp.toString())
    request.headers.set('sign', sign)

    return fetch(request)
  }
}

export interface SignedFetchOptions {
  /**
   * The secret to sign the request with.
   * The secret is responded with the `generate_cred_by_code` operation.
   * If the secret is a function, it will be called every time a request is made;
   * otherwise, it will be simply used as the secret.
   * If the secret is not provided, the client will try to fetch an existing secret from the storage
   * by the key `secret`.
   */
  secret?: string | (() => Promise<string>)
}

export const createSignedFetch: (options: SignedFetchOptions) => typeof fetch = (options) => {
  const signedFetch = new SignedFetch(options)
  return signedFetch.fetch.bind(signedFetch)
}
