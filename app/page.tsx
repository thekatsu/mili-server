import CardStatusProgress from '@/app/components/CardStatusProgress';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <CardStatusProgress />
    </main>
  );
}
