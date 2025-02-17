import { WalletProvider } from '@coin98-com/wallet-adapter-react'
import { WalletModalProvider } from '@coin98-com/wallet-adapter-react-ui'
import { FC, ReactNode } from 'react'
import { chainsSupported, defaultChains, DynamicWalletModalC98, walletsSupported } from './constants'
import React from 'react'

interface AdapterProviderProps {
  children: ReactNode
}

const AdapterProvider: FC<AdapterProviderProps> = ({ children }) => {
  return (
    <WalletProvider wallets={walletsSupported} enables={chainsSupported} autoConnect keepConnectionOnDisconnected>
      <WalletModalProvider>
        <DynamicWalletModalC98 enableChains={defaultChains} />
        {children}
      </WalletModalProvider>
    </WalletProvider>
  )
}

export default AdapterProvider
