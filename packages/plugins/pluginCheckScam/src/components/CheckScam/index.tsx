import { Button, Icon, Input } from '@repo/ui';
import React, { useState } from 'react';
import { mockUserInfo } from '../../mocks';
import { useGlobalHook } from '@repo/plugin-sdk';
import { UserStore, useUserStore } from '@repo/store';
import { TUserInfo } from '@repo/store/types';
import CardLayout from './CardLayout.component';

const CheckScam = () => {
  return (
    <section className="">
      <CardLayout />
    </section>
  );
};

export default CheckScam;
