import React from 'react';
import { FUNCS, MAIN_FUNCS } from '../../constants';
import { Card, CardContent, CardHeader, CardTitle, Icon } from '@repo/ui';
import ModalDialog from '../ModalDialog';
import Security from './Security.component';
import Trending from './Trending.components';

const RENDERED_DATA = {
  [FUNCS.SecurityDetection]: <Security />,
  [FUNCS.Trending]: <Trending />,
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
            {MAIN_FUNCS.map((func, index) => {
              return (
                <ModalDialog
                  key={func}
                  trigger={
                    <div key={func}>
                      <div className="flex flex-col items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer hover:bg-[#4da2ff] bg-[#f7f7f81a]">
                        {index === 1 ? (
                          <p className="text-3xl">🔥</p>
                        ) : (
                          <Icon name="app_dfinity" className="text-3xl" />
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
