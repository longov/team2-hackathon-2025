import React from 'react';
import { FUNCS, MAIN_FUNCS } from '../../constants';
import { Card, CardContent, CardHeader, CardTitle, Icon } from '@repo/ui';
import ModalDialog from '../ModalDialog';
import Security from './Security.component';

const RENDERED_DATA = {
  [FUNCS.SecurityDetection]: <Security />,
  [FUNCS.Trending]: <>Trending</>,
  [FUNCS.Daily]: <>Daily</>,
  [FUNCS.Noti]: <>Noti</>,
};

const CardLayout = () => {
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Security Detection</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-2">
            {MAIN_FUNCS.map((func) => {
              return (
                <ModalDialog
                  key={func}
                  trigger={
                    <div key={func} className="">
                      <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                        <Icon name="app_dfinity" className="text-3xl" />
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
