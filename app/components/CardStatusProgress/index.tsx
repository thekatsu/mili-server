'use client';

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import StartButton from './StartButton';
import { inngest } from '@/app/inngest/client';

export default function CardStatusProgress() {
  async function headleStartImport() {
    'use server';

    console.log('aciona inngest!');
    await inngest.send({
      name: 'test/products.import',
    });
  }

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>Importing product data</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <PackageIcon className="h-6 w-6" />
          <div className="grid gap-1.5">
            <h2 className="text-sm font-semibold">Products</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Importing product data
            </p>
          </div>
          <StartButton callback={headleStartImport} />
        </div>
        <div className="flex items-center gap-4">
          <InfoIcon className="h-6 w-6" />
          <div className="grid gap-1.5">
            <h2 className="text-sm font-semibold">Status</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Processing 0% complete
            </p>
          </div>
        </div>
        <Progress value={25} />
      </CardContent>
    </Card>
  );
}

function InfoIcon({ ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function PackageIcon({ ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
