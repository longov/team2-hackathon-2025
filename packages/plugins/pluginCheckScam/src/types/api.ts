import { AxiosRequestConfig } from 'axios';

export interface APIConfig {
  handleAuthen?: (error: any) => Promise<AxiosRequestConfig<any>>;
  getToken?: () => string;
  getPerSign?: () => string;
  authority?: {
    signature: string;
  };
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
}
