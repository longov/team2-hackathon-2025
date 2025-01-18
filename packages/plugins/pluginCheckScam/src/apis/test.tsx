import { APIResponse } from '../types/api';
import { API } from './core';

const get = async () => {
  const res = await API.checkScam.get<any, APIResponse<any>>('/healthcheck');

  return res.data;
};

export default {
  get,
};
