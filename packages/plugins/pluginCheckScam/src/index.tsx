import { useGlobalHook, useRegisterPlugin } from '@repo/plugin-sdk';
import React from 'react';
import Portfolio from './components/CheckScam';
import { TUserInfo } from '@repo/store/types';

export const PluginCheckScam = () => {
  const { add_hook, do_action } = useGlobalHook();

  const bootstrap = () => {
    //This fn can be extracted;
    add_hook(
      'subtitle',
      () => {
        return <div key={'test'}>You can only be scammed by yourself!</div>;
      },
      'action',
      'PluginCheckScam'
    );
    add_hook(
      'dataPortfolio',
      (...args: any[]) => {
        console.log('Args in dataPortfolio:', args);
        const [mockUserInfo, inputAddress] = args;
        const result = mockUserInfo.filter(
          (user: TUserInfo) => user.address === inputAddress
        );
        return result;
      },
      'filter',
      'PluginCheckScam'
    );
  };

  useRegisterPlugin({
    name: 'PluginCheckScam',
    author: 'Team2',
    bootstrap,
  });
  return (
    <div className="border rounded-lg p-4 border-dividerColorDefault">
      This is Plugin Check Scam
      <Portfolio />
      {do_action('subtitle')}
    </div>
  );
};
