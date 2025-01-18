import axios, { AxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import _pickBy from 'lodash/pickBy';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import _keys from 'lodash/keys';
import { APIConfig } from '../types/api';

interface MethodOptions extends AxiosRequestConfig {
  token?: string;
}

class APIService {
  private _baseURL: string;
  private _config: APIConfig;

  constructor(baseURL: string, config?: APIConfig) {
    this._baseURL = baseURL;
    this._config = config || {};
  }

  setBaseURL(url: string) {
    this._baseURL = url;
  }

  async get<Query, Data>(
    url: string,
    query?: Query,
    options?: MethodOptions
  ): Promise<Data> {
    const response = await this._gateWay(options).get(url, {
      params: _pickBy(query || {}, (v: any) => v === false || v),
    });
    return response.data;
  }

  async post<Body, Data>(
    url: string,
    body: Body,
    options?: MethodOptions
  ): Promise<Data> {
    const response = await this._gateWay(options).post(
      url,
      _pickBy(body || {}, (v: any) => v === false || v)
    );

    return response.data;
  }

  async put<Body, Data>(
    url: string,
    body: Body,
    options?: MethodOptions
  ): Promise<Data> {
    const response = await this._gateWay(options).put(url, body);

    return response.data;
  }

  async getCorsMode<Query, Data>(
    url: string,
    query?: Query,
    options?: RequestInit
  ): Promise<Data> {
    const endPoint = queryString.stringifyUrl({
      url: this._baseURL + url,
      query: query || {},
    });
    const response = await fetch(endPoint, options);

    return response.json() as any;
  }

  private _gateWay<Body>(options?: MethodOptions) {
    let token = options?.token ?? this._config.getToken?.() ?? '';

    const onChainSign = this._config.getPerSign?.();
    const config: AxiosRequestConfig<Body> = {
      timeout: 120 * 1000, //120s
      baseURL: this._baseURL,
      headers: {
        Source: process.env.NEXT_PUBLIC_SOURCE_API,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Version: process.env.NEXT_PUBLIC_APP_VERSION,
        Authorization: `Bearer ${token}`,
        onchainSignature: onChainSign,
        Signature: this._config.authority?.signature,
        ...options?.headers,
      },
      ..._omit(options, ['headers', 'token']),
    };

    const instants = axios.create(config);
    instants.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const code = _get(error, 'response.status', 0);
        const hasHandleAuthen = Boolean(this._config.handleAuthen);

        if (code === 401 && hasHandleAuthen) {
          //handle authen
          const requestConfig = await this._config.handleAuthen!(error).catch(
            () => null
          );
          if (requestConfig) return instants.request(requestConfig);
        }
        const DEFAULT_ERROR = {
          data: {
            data: {
              errMess: 'unknowError',
            },
            success: false,
          },
        };
        const response = _get(error, 'response.data.data');
        const hasResponse = _keys(response).length;
        if (!hasResponse) {
          return DEFAULT_ERROR;
        }
        return _get(error, 'response', DEFAULT_ERROR);
      }
    );

    return instants;
  }
}

export const API = {
  checkScam: new APIService(
    process.env.NEXT_PUBLIC_CLIENT_ENDPOINT ||
      'https://api.coingecko.com/api/v3',
    {
      getToken: () => '',
      getPerSign: () => '',
    }
  ),
  checkAi: new APIService(
    process.env.NEXT_PUBLIC_CLIENT_ENDPOINT ||
      'http://10.10.0.249:3000',
    {
      getToken: () => '',
      getPerSign: () => '',
    }
  ),
};
