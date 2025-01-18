import React from 'react';
import { FUNCS, MAIN_FUNCS } from '../../constants';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import ModalDialog from '../ModalDialog';
import Security from './Security.component';
import Trending from './Trending.components';
import ChatAI from './ChatAI.component';

const RENDERED_DATA = {
  [FUNCS.SecurityDetection]: <Security />,
  [FUNCS.Trending]: <Trending />,
  [FUNCS.Daily]: <ChatAI />,
  [FUNCS.Noti]: <>Noti</>,
};

const CardLayout = () => {
  return (
    <main>
      <Card className="bg-[#343858] border-[#464C6A] bg-[url('https://cdn.prod.website-files.com/6425f546844727ce5fb9e5ab/6568c438caca9358f397a709_Data_cube_v04_v03_1920_coloured-poster-00001.jpg')]">
        <CardHeader>
          <CardTitle>RiskRadar</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 ">
          <div className="grid grid-cols-2 gap-2">
            {MAIN_FUNCS.map((func, index) => {
              return (
                <ModalDialog
                  className={'overflow-auto'}
                  classNameTrigger="min-h-[5rem] hover:bg-[#4da2ff] bg-[#f7f7f81a] rounded-lg"
                  key={func}
                  trigger={
                    <div key={func} className="min-h-[5rem]">
                      <div className=" flex flex-col items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                        {index === 0 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                            />
                          </svg>
                        ) : index === 1 ? (
                          <p className="text-3xl">🔥</p>
                        ) : index === 3 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                            />
                          </svg>
                        )}
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
