import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(time: number) {
  console.log(`sleep for ${time}`);
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export function dateFormat(date: string) {
  if (!date) return null;
  const [data, horario] = date.split(' ');
  const [dia, mes, ano] = data.split('/');
  return new Date(`${ano}-${mes}-${dia}T${horario}.0000`);
}

export async function awaitFor(elapsed_time: number, goal: number) {
  if (elapsed_time < goal) {
    await sleep(goal - elapsed_time);
  }
}

export function fetcher(url: string) {
  return fetch(url).then((r) => r.json());
}
