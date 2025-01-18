// import { UserStore, useUserStore } from '@repo/store';
import React, { useState } from 'react';
// import DefiClient, { IScannerProject } from '../../apis/client';
import DefiClient from '../../apis/client';

// import { useGlobalHook } from '@repo/plugin-sdk';
import {
  Button,
  Icon,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui';
import PieChartComponent from '../PieChart';
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

const Security = () => {
  //STATES
  // const users = useUserStore((state: UserStore) => state.users);
  // const setUsers = useUserStore((state: UserStore) => state.setUsers);
  const [inputData, setInputData] = useState<InputData>({});
  // const [scannerData, setScannerData] = useState<IScannerProject>();

  // const { apply_filter } = useGlobalHook();

  const handleSearchData = async () => {
    const address = _get(inputData, 'address');
    const chainId = _get(inputData, 'chainId.chainIdQuery');

    if (!address || !chainId) return;

    const res = await DefiClient.queryScannerProject({
      address,
      chainId,
    });

    console.log({ res });

    // setScannerData(res);
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
    <div>
      <div className="flex-1">
        <div className="text-lg font-semibold">Security Detection</div>
        <div className="text-muted-foreground">
          Check if the address is a scam or not
        </div>
        <PieChartComponent />
      </div>
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
        <Button
          onClick={handleSearchData}
          disabled={!inputData.address || !inputData.chainId}
        >
          Search
        </Button>
      </div>
    </div>

  );
};

export default Security;
