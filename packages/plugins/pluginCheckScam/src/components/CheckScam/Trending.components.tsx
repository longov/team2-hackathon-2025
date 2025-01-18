import React from 'react';
import { useState } from 'react';
import GetApi from '../../apis/test';
import { useEffect } from 'react';

const Trending = () => {
  const [api, setApi] = useState<any>([]);

  const getApi = async () => {
    const res = await GetApi.getTrending();
    setApi(res);
  };

  useEffect(() => {
    getApi();
  }, []);

  console.log(api, '_apiapi');

  if (!api || api.length === 0)
    return (
      <div className="animate-pulse rounded-md bg-white/10 w-full h-[30dvh]"></div>
    );

  return (
    <div>
      <p className="mb-5 fonttext-xl">🔥 Trending</p>
      <div className="grid grid-cols-2 gap-2">
        {api &&
          api?.coins?.map((item: any, index: number) => {
            const itemCoins = item.item;
            if (index > 5) return;
            const greenColor =
              itemCoins?.data.price_change_percentage_24h.usd > 0
                ? 'text-green-500'
                : 'text-red-500';
            return (
              <div
                key={itemCoins.coin_id}
                className="flex flex-col items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer hover:bg-[#4da2ff] bg-[#f7f7f81a]"
                onClick={() =>
                  window.open(
                    `https://www.coingecko.com/en/coins/${itemCoins?.slug}`
                  )
                }
              >
                <div className="flex">
                  <img
                    width={25}
                    height={25}
                    src={itemCoins.large}
                    className="rounded-full border-[#464C6A]"
                    alt={itemCoins.name}
                  />
                  <p className="pl-2">{itemCoins.symbol}</p>
                </div>

                <p>{itemCoins?.data.price.toFixed(2)}$</p>
                <p className={greenColor}>
                  ({itemCoins?.data.price_change_percentage_24h.usd.toFixed(2)}
                  )%
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Trending;
