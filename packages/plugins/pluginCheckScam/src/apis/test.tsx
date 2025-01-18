import { APIResponse } from '../types/api';
import { API } from './core';

const getTrending = async () => {
  const res = await API.checkScam.get<any, APIResponse<any>>('/search/trending', {
    headers: {
    accept: 'application/json',
    'x-cg-demo-api-key': 'CG-fsX5bfdaGMmezZCai67gH1rT'
    }

  });

  return res;
};


const getAI = async (messages: any, signal: AbortSignal) => {
  const res = await API.checkAi.post<any, APIResponse<any>>('/chat', {
    chat: messages,
  }, {
    headers: {
      accept: 'application/json',
      mode: 'no-cors',
    },
    signal
  });

  return res;
};


export default {
  getTrending,
  getAI
};
