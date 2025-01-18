import { APIResponse } from '../types/api';
import { API } from './core';

const getTrending = async () => {
  const res = await API.checkScam.get<any, APIResponse<any>>('/search/trending', {
    headers: {
    accept: 'application/json',
    'x-cg-demo-api-key': 'CG-fsX5bfdaGMmezZCai67gH1rT'
    }
   
  });

  console.log(res, 'res.data');
  return res;
};

export default {
  getTrending,
};
