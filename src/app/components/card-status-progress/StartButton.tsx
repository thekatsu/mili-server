'use client';

import { Button } from '@/components/ui/button';

type Props = {
  callback: Function;
};

export default function StartButton({ callback }: Props) {
  return (
    <Button size="sm" onClick={(e) => callback(e)}>
      Start
    </Button>
  );
}
