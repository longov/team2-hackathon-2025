import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  cn,
} from '@repo/ui';

interface Props {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const ModalDialog = ({ trigger, children, className, title = '' }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          // "pt-0 bg-[url('https://cdn.prod.website-files.com/6425f546844727ce5fb9e5ab/6568c438caca9358f397a709_Data_cube_v04_v03_1920_coloured-poster-00001.jpg')]",
          'border-none',
          className
        )}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
