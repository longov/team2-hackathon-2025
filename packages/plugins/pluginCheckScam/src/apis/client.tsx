import { Client, createClient } from '@de-fi/sdk';
import _get from 'lodash/get';

export interface IScannerProject {
  address?: string;
  aiScore?: number;
  name?: string;
  contractName?: string;
  whitelisted?: boolean;
  coreIssues?: CoreIssue[];
  logo?: string;
  stats?: Stats;
}

export interface CoreIssue {
  scwId: string;
  scwTitle?: string;
  scwDescription: string;
}

export interface Stats {
  low: number;
  medium: number;
  high: number;
  critical: number;
  total: number;
  scammed: boolean;
  percentage: number;
}

const queryClientDefi: Client = createClient({
  url: 'https://public-api.de.fi/graphql',
  headers: { 'X-Api-Key': '7339bb0e7a434c16ae019fdd8df798fd' },
});

const DEFAULT_PARAMS = {
  address: true,
  aiScore: true,
  name: true,
  contractName: true,
  whitelisted: true,
  coreIssues: {
    scwId: true,
    scwTitle: true,
    scwDescription: true,
    issues: {
      confidence: true,
      description: true,
      data: true,
      impact: true,
      id: true,
    },
  },
  logo: true,
  stats: {
    low: true,
    medium: true,
    high: true,
    critical: true,
    total: true,
    scammed: true,
    percentage: true,
  },
};

const queryScannerProject = async (body: {
  address: string;
  chainId: number;
}): Promise<IScannerProject> => {
  const res = (await queryClientDefi.query({
    scannerProject: [
      {
        where: body,
      },
      DEFAULT_PARAMS,
    ],
  })) as IScannerProject;

  return _get(res, 'data.scannerProject', {});
};

// const queryScannerProject = async (address: string) => {
//     const res = await queryClientDefi.query({
//         scannerProject: [{
//             where: {
//                 address: address || '0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4',
//                 chainId: 49 // Replace with the appropriate chainId
//             }
//         },
//         {
//             id: true,
//             address: true,
//             network: true,
//             inProgress: true,
//             aiScore: true,
//             name: true,
//             contractName: true,
//             firstTxFrom: true,
//             firstTxDate: true,
//             firstTxBlock: true,
//             onChainScanned: true,
//             staticAnalizeScanned: true,
//             diffCheckScanned: true,
//             logo: true,
//             compilerVersion: true,
//             txCount: true,
//             initialFunder: true,
//             initialFunding: true,
//             outdatedCompiler: true,
//             scannedVersion: true,
//             scannerVersion: true,
//             protocol: true,
//             whitelisted: true,
//             estimatedAnalyzingTime: true,
//             rescanCount: true,
//             deploymentBlock: true,
//             sourceCodeLink: true,
//             link: true,
//         }]
//     });
//     console.log('queryScannerProject:', res);
//     return res;
// }

export default {
  queryScannerProject,
};
