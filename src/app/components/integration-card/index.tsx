import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import Link from 'next/link';

export type IntegrationCardProps = {
  title: string;
  description: string;
  content?: string;
  href: string;
};

export default function IntegrationCard({
  title,
  description,
  content,
  href,
  ...props
}: IntegrationCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">{content}</CardContent>
      <CardFooter className="items-end justify-end p-2">
        <Button variant="outline" asChild>
          <Link href={href} scroll={false}>
            Editar
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
