import _mapValues from 'lodash/mapValues';
import _pickBy from 'lodash/pickBy';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export enum CHAIN_KIND {
  EVM = 'evm',
}

export const CHAIN_DATA = {
  //new constant
  1: {
    kind: CHAIN_KIND.EVM,
    key: '1',

    numChainId: '1',
    chainId: '0x1',

    id: 'ethereum', // chainKey

    trcToken: 'ERC20',
    icon: 'web_ethereum',
    name: 'Ethereum',
    shortName: 'Ethereum',
    imageLink:
      'https://coin98.s3-ap-southeast-1.amazonaws.com/Coin/ethActive2.png',

    symbol: 'ETH',
    decimals: 18,

    rpcURL: `https://mainet.infura.io/v3/92d53cee52834368b0fabb42fa1b5570`,
    scan: 'https://etherscan.io',

    chainKey: 'ether',
    nativeToken: ZERO_ADDRESS,
  },

  88: {
    kind: CHAIN_KIND.EVM,
    key: '88',

    numChainId: '88',
    chainId: '0x58',

    id: 'tomo',

    trcToken: 'VRC25',
    icon: 'web_viction',
    name: 'Viction',
    shortName: 'VIC',
    imageLink: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Chains/tomo.png',

    symbol: 'VIC',
    decimals: 18,

    rpcURL: [
      'https://rpc.tomochain.com',
      'https://rpc2.tomochain.com',
      'https://rpc.viction.xyz',
      'https://rpc5.viction.xyz',
    ],
    scan: 'https://www.vicscan.xyz',

    chainKey: 'tomo',
    nativeToken: ZERO_ADDRESS,
  },
} as const;

export const CHAIN_ID = _pickBy(_mapValues(CHAIN_DATA, 'numChainId'));

export type ChainData = (typeof CHAIN_DATA)[keyof typeof CHAIN_DATA] & {
  prefix?: string;
  minimalDenom?: string;
};
export type ChainId = ChainData['numChainId'];
export type ChainKey = ChainData['chainKey'];
