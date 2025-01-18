import { FUNCS, MAIN_FUNCS } from '../../constants';
import { Card, CardContent, CardHeader, CardTitle, Icon } from '@repo/ui';
import { useState } from 'react'
import ModalDialog from '../ModalDialog';
import GetApi from '../../apis/test';
import Security from './Security.component';
import { useEffect } from 'react';
import Image from 'next/image';


const Trending = () => {
  const [api, setApi] = useState<any>([]);

  const getApi = async () => {
    const res = await GetApi.getTrending();
    setApi(res)
  }

  useEffect(() => {
    getApi()
  },[])

  console.log(api,'_apiapi')

  return (
    <div>
      <p className="mb-5 fonttext-xl">🔥 Trending</p>
      <div className="grid grid-cols-2 gap-2">
        {api && api?.coins?.map((item:any,index: number) => {
          const itemCoins = item.item;
          if(index > 5) return;
          const greenColor = itemCoins?.data.price_change_percentage_24h.usd > 0 ? 'text-green-500' : 'text-red-500';
          return (
            <div key={itemCoins.coin_id} className="flex flex-col items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer hover:bg-[#4da2ff] bg-[#f7f7f81a]">
              <div className="flex">
                <Image
                  width={25}
                  height={25}
                  src={itemCoins.large}
                  className="rounded-full border-[#464C6A]"
                  alt={itemCoins.name}
                />
                <p className="pl-2">{itemCoins.symbol}</p>
              </div>
             
              <p>{itemCoins?.data.price.toFixed(2)}$</p>
              <p className={greenColor}>({itemCoins?.data.price_change_percentage_24h.usd.toFixed(2)})%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}


const RENDERED_DATA = {
  [FUNCS.SecurityDetection]: <Security />,
  [FUNCS.Trending]: <Trending/>,
  [FUNCS.Daily]: <>Daily</>,
  [FUNCS.Noti]: <>Noti</>,
};


const CardLayout = () => {
  return (
    <main>
      <Card className="bg-[#343858] border-[#464C6A] bg-[url('https://cdn.prod.website-files.com/6425f546844727ce5fb9e5ab/6568c438caca9358f397a709_Data_cube_v04_v03_1920_coloured-poster-00001.jpg')]">
        <CardHeader>
          <CardTitle>Security Detection</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-2">
            {MAIN_FUNCS.map((func,index) => {
              return (
                <ModalDialog
                  key={func}
                  trigger={
                    <div key={func}>
                      <div className="flex flex-col items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer hover:bg-[#4da2ff] bg-[#f7f7f81a]">
                        {
                          index === 1 ? <p className="text-3xl">🔥</p>
                          :
                          <Icon name="app_dfinity" className="text-3xl" />
                        }
                        {func}
                      </div>
                    </div>
                  }
                >
                  <div>{RENDERED_DATA[func]}</div>
                </ModalDialog>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default CardLayout;
