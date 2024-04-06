'use client';

import {
  Button as ButtonShadcn,
  ButtonProps as ButtonPropsShadcn,
} from '@/app/components/ui/button';

// import { startProductImport } from '@/app/actions';

type ButtonProps = ButtonPropsShadcn & {
  serverFunction?: () => Promise<null>;
};

export function Button({ serverFunction, ...props }: ButtonProps) {
  return (
    <ButtonShadcn
      onClick={async (event) => {
        if (serverFunction) await serverFunction();
      }}
      {...props}
    ></ButtonShadcn>
  );
}
