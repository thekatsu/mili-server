'use client';

import useSWR from 'swr';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Card as CardShadcn,
  CardTitle,
} from '@/app/components/ui/card';
import { Button } from '../button';
import { fetcher } from '@/app/lib/utils';
import { Progress } from '@/app/components/ui/progress';

type CardProps = {
  title: string;
  description?: string;
  action: () => Promise<null>;
  endpointProgress: string;
};

type ProgressType = {
  id: string;
  key: string;
  progress: number;
  startDate: Date;
  endDate: Date | null;
};

export function Card({
  title,
  description,
  action,
  endpointProgress,
}: CardProps) {
  const { data, error, isLoading } = useSWR<ProgressType>(
    endpointProgress,
    fetcher,
    { refreshInterval: 60000 },
  );

  const progress = data?.progress;

  return (
    <CardShadcn className="m-4 flex h-fit w-fit flex-1 flex-col">
      <CardHeader className="">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-1">
        {isLoading && <p>Carregando</p>}
        {error && <p>Falhou: {error}</p>}
        <div className="flex flex-1 flex-col">
          <Progress value={progress}></Progress>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button serverFunction={action}>Iniciar</Button>
      </CardFooter>
    </CardShadcn>
  );
}
