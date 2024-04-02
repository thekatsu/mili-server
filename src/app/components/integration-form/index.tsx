'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  FormSchema,
  formType,
} from '@/components/integration-form/integration-form.d';

export default function IntegrationForm({
  initialData,
  onSubmitCb,
}: {
  initialData: formType | undefined;
  onSubmitCb: (data: any) => Promise<boolean>;
}) {
  const form = useForm<formType>({
    resolver: zodResolver(FormSchema),
    values: initialData,
  });

  const onSubmit: SubmitHandler<formType> = (data) => onSubmitCb(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={'name'}
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nome da integração"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>Uma descrição qualquer</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'description'}
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input
                  placeholder="Descrição da integração"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>Uma descrição qualquer</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'baseUrl'}
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>URL Base</FormLabel>
              <FormControl>
                <Input
                  placeholder="URL base da integração, exemplo: https://minhaapi.com/api"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormDescription>Uma descrição qualquer</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'token'}
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Token de autendicação</FormLabel>
              <FormControl>
                <Input
                  placeholder="Exemplo: 3e534d3b2f9fa470a4e7004216d2861118fbe485"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>Uma descrição qualquer</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'params'}
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Parametros da URL</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormDescription>Uma descrição qualquer</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name={'type'}
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Metodo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Exemplo: 3e534d3b2f9fa470a4e7004216d2861118fbe485"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>Uma descrição qualquer</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </form>
    </Form>
  );
}
