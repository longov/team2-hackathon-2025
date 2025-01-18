import React, { useState } from 'react';
import { UserStore, useUserStore } from '@repo/store';
import { MAIN_FUNCS } from '../../constants';
import DefiClient, { IScannerProject } from '../../apis/client';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
  Label,
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
  Input,
  RadioGroup,
  RadioGroupItem,
  Icon,
} from '@repo/ui';
import { useGlobalHook } from '@repo/plugin-sdk';

import _get from 'lodash/get';

enum CHAIN_NAME {
  BASE = 'Base',
  ETHEREUM = 'Ethereum',
}

const SUPPORTED_CHAINS = {
  [CHAIN_NAME.BASE]: {
    name: CHAIN_NAME.BASE,
    chainId: 8453,
    chainIdQuery: 49,
  },
  [CHAIN_NAME.ETHEREUM]: {
    name: CHAIN_NAME.ETHEREUM,
    chainId: 1,
    chainIdQuery: 1, // ??
  },
};

const CHAINS = Object.values(SUPPORTED_CHAINS);

interface InputData {
  address?: string;
  chainId?: (typeof CHAINS)[0];
}

const CardLayout = () => {
  //STATES
  const users = useUserStore((state: UserStore) => state.users);
  const setUsers = useUserStore((state: UserStore) => state.setUsers);
  const [inputData, setInputData] = useState<InputData>({});
  const [scannerData, setScannerData] = useState<IScannerProject>();

  const { apply_filter } = useGlobalHook();

  const handleSearchData = async () => {
    const address = _get(inputData, 'address');
    const chainId = _get(inputData, 'chainId.chainIdQuery');
    if (!address || !chainId) return;

    const res = await DefiClient.queryScannerProject({
      address,
      chainId,
    });

    setScannerData(res);
  };

  const handleOnChange =
    (field: keyof InputData) =>
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const data =
        typeof e === 'string'
          ? SUPPORTED_CHAINS[e as CHAIN_NAME]
          : e.target.value || '';

      console.log({ field, data });

      setInputData((prev) => ({ ...prev, [field]: data }));
    };

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>
            Add a new payment method to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <RadioGroup
            defaultValue={MAIN_FUNCS[0]}
            className="flex flex-wrap justify-center"
          >
            {MAIN_FUNCS.map((func) => {
              return (
                <div key={func} className="min-w-[10rem]">
                  <RadioGroupItem
                    value={func}
                    id={func}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={func}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Icon name="app_dfinity" className="text-3xl" />
                    {func}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <div className="flex gap-x-2 text-sm w-full">
            <div className="border border-backgroundInput rounded-lg flex items-center px-3 py-1 gap-2 hover:border-textLink flex-1">
              <Icon name="app_search_left" />
              <Input
                placeholder="Search address..."
                onChange={handleOnChange('address')}
              />
              <Select onValueChange={handleOnChange('chainId')}>
                <SelectTrigger className="focus:ring-0 focus:outline-none focus:rounded-none !rounded-sm border-border-subtle h-[40px] w-fit min-w-[106px]">
                  <SelectValue placeholder={'Select chain'}>
                    <p className="text-black-1">{inputData.chainId?.name}</p>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="rounded-sm text-white bg-black">
                  {CHAINS.map((chain) => {
                    return (
                      <SelectItem
                        key={chain.name}
                        className="rounded-sm placeholder:text-black-1 focus:bg-black/5 cursor-pointer"
                        value={chain.name}
                      >
                        {chain.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSearchData}>Search</Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default CardLayout;
