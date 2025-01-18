// import { UserStore, useUserStore } from '@repo/store';
import React, { useState } from 'react';
// import DefiClient, { IScannerProject } from '../../apis/client';
import DefiClient, { IScannerProject } from '../../apis/client';

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
import DataInfo from './DataInfo.component';

enum CHAIN_NAME {
  BASE = 'Base',
  ETHEREUM = 'Ethereum',
  BINANCE = 'Binance',
  POLYGON = 'Polygon',
  FANTOM = 'Fantom',
  ARBITRUM = 'Arbitrum',
  AVALANCHE = 'Avalanche',
  SOLANA = 'Solana',
  CRONOS = 'Cronos',
  OPTIMISM = 'Optimism',
  TERRA = 'Terra',
  CARDANO = 'Cardano',
  RONIN = 'Ronin',
  THORCHAIN = 'Thorchain',
  AKASH = 'Akash',
  KUJIRA = 'Kujira',
  TERRA2 = 'Terra-2',
  BITCOIN = 'Bitcoin',
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
    chainIdQuery: 1,
  },
  [CHAIN_NAME.BINANCE]: {
    name: CHAIN_NAME.BINANCE,
    chainId: 56,
    chainIdQuery: 2,
  },
  [CHAIN_NAME.POLYGON]: {
    name: CHAIN_NAME.POLYGON,
    chainId: 137,
    chainIdQuery: 3,
  },
  [CHAIN_NAME.FANTOM]: {
    name: CHAIN_NAME.FANTOM,
    chainId: 250,
    chainIdQuery: 4,
  },
  [CHAIN_NAME.ARBITRUM]: {
    name: CHAIN_NAME.ARBITRUM,
    chainId: 42161,
    chainIdQuery: 5,
  },
  [CHAIN_NAME.AVALANCHE]: {
    name: CHAIN_NAME.AVALANCHE,
    chainId: 43114,
    chainIdQuery: 6,
  },
  [CHAIN_NAME.SOLANA]: {
    name: CHAIN_NAME.SOLANA,
    chainId: 101,
    chainIdQuery: 12,
  },
  [CHAIN_NAME.CRONOS]: {
    name: CHAIN_NAME.CRONOS,
    chainId: 25,
    chainIdQuery: 14,
  },
  [CHAIN_NAME.OPTIMISM]: {
    name: CHAIN_NAME.OPTIMISM,
    chainId: 10,
    chainIdQuery: 17,
  },
  [CHAIN_NAME.TERRA]: {
    name: CHAIN_NAME.TERRA,
    chainId: 'columbus-5',
    chainIdQuery: 19,
  },
  [CHAIN_NAME.CARDANO]: {
    name: CHAIN_NAME.CARDANO,
    chainId: 1003,
    chainIdQuery: 22,
  },
  [CHAIN_NAME.RONIN]: {
    name: CHAIN_NAME.RONIN,
    chainId: 1002,
    chainIdQuery: 24,
  },
  [CHAIN_NAME.THORCHAIN]: {
    name: CHAIN_NAME.THORCHAIN,
    chainId: 2008,
    chainIdQuery: 32,
  },
  [CHAIN_NAME.AKASH]: {
    name: CHAIN_NAME.AKASH,
    chainId: 2012,
    chainIdQuery: 36,
  },
  [CHAIN_NAME.KUJIRA]: {
    name: CHAIN_NAME.KUJIRA,
    chainId: 2013,
    chainIdQuery: 37,
  },
  [CHAIN_NAME.TERRA2]: {
    name: CHAIN_NAME.TERRA2,
    chainId: 2015,
    chainIdQuery: 40,
  },
  [CHAIN_NAME.BITCOIN]: {
    name: CHAIN_NAME.BITCOIN,
    chainId: 'bitcoin',
    chainIdQuery: 44,
  },
};

const CHAINS = Object.values(SUPPORTED_CHAINS);

export interface InputData {
  address?: string;
  chainId?: (typeof CHAINS)[0];
}

const Security = () => {
  //STATES
  // const users = useUserStore((state: UserStore) => state.users);
  // const setUsers = useUserStore((state: UserStore) => state.setUsers);
  const [inputData, setInputData] = useState<InputData>({});
  const [scannerData, setScannerData] = useState<IScannerProject>();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // const { apply_filter } = useGlobalHook();

  const handleSearchData = async () => {
    const address = _get(inputData, 'address');
    const chainId = _get(inputData, 'chainId.chainIdQuery');

    if (!address || !chainId) return;
    setIsLoading(true);

    try {
      const res = await DefiClient.queryScannerProject({
        address,
        chainId,
      });

      console.log({ res });

      if (res?.address === null) {
        setIsLoading(false);
        return setErr('No data');
      }

      setScannerData(res);
    } catch (error) {}
    setIsLoading(false);
  };

  const handleOnChange =
    (field: keyof InputData) =>
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      setErr(null);

      const data =
        typeof e === 'string'
          ? SUPPORTED_CHAINS[e as CHAIN_NAME]
          : e.target.value || '';

      console.log({ field, data });

      setInputData((prev) => ({ ...prev, [field]: data }));
    };

  return (
    <div className="">
      <div className="flex-1 py-4">
        <div className="text-lg font-semibold pb-4">Security Detection</div>
        {isLoading ? (
          <div className="animate-pulse rounded-md bg-white/10 w-full h-[30dvh]"></div>
        ) : err ? (
          <div className="text-center py-4">No Data</div>
        ) : (
          <div className="space-y-4 max-h-[60dvh] overflow-auto">
            <PieChartComponent data={scannerData} />
            <DataInfo data={scannerData} />
          </div>
        )}
      </div>
      <div className="flex gap-x-2 text-sm w-full items-center">
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
          disabled={!inputData.address || !inputData.chainId || isLoading}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Security;
