'use client';

import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { HTMLInputTypeAttribute, use, useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Label } from '@/app/components/ui/label';
import { FormSchemaType } from '@/api/v1/integration/actions';
import { z } from 'zod';

type FieldRadioOptionType = {
  name: string;
  value: string;
  label: string;
};

type FormFieldType = {
  name: keyof FormSchemaType;
  label: string;
  option?: FieldRadioOptionType[];
  type: HTMLInputTypeAttribute;
  placeholder: string;
  description: string;
};

type FormFieldsType = FormFieldType[];

const formFields: FormFieldsType = [
  {
    name: 'name',
    label: 'Nome',
    type: 'text',
    placeholder: 'Nome da integração',
    description: '',
  },
  {
    name: 'description',
    label: 'Descrição',
    type: 'text',
    placeholder: 'Descrição da integração',
    description: '',
  },
  {
    name: 'baseUrl',
    label: 'URL',
    type: 'url',
    placeholder: 'URL base da integração, exemplo: https://minhaapi.com/api',
    description: '',
  },
  {
    name: 'token',
    label: 'Token de autenticação',
    type: 'text',
    placeholder: 'Exemplo: 3e534d3b2f9fa470a4e7004216d2861118fbe485',
    description: '',
  },
  {
    name: 'params',
    label: 'Parametros da url',
    type: 'text',
    placeholder: '{}',
    description: '',
  },
  {
    name: 'type',
    label: 'Tipo da requisição',
    placeholder: 'POST ou GET',
    type: 'radio',
    description: '',
    option: [
      {
        name: 'rest',
        value: 'REST',
        label: 'REST',
      },
      {
        name: 'soap',
        value: 'SOAP',
        label: 'SOAP',
      },
    ],
  },
  {
    name: 'requestPerMinute',
    label: 'Requesições por minito',
    type: 'number',
    placeholder: '',
    description: '',
  },
];

function FormInput(field: FormFieldType, { ...item }) {
  return (
    <FormItem className="mb-5">
      <FormLabel>{field.label}:</FormLabel>
      <FormControl>
        {field.type === 'radio' ? (
          <RadioGroup
            onValueChange={item.onChange}
            defaultValue={item.value}
            className="flex gap-5"
          >
            {field.option?.map((opt) => {
              return (
                <div key={opt.name} className="flex space-x-2">
                  <RadioGroupItem value={opt.value} id={opt.name} />
                  <Label htmlFor={opt.name}>{opt.label}</Label>
                </div>
              );
            })}
          </RadioGroup>
        ) : (
          <Input placeholder={field.placeholder} type={field.type} {...item} />
        )}
      </FormControl>
      <FormDescription>{field.description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
}

type FormEditProps = {
  formData: Promise<FormSchemaType | null>;
};

export const FormSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(2),
  description: z.string().max(500),
  baseUrl: z.string().url().max(255),
  token: z.string().max(512),
  params: z.string(),
  type: z.enum(['REST', 'SOAP']),
  requestPerMinute: z.number(),
  active: z.boolean(),
});

export function FormEdit({ formData }: FormEditProps) {
  const integration = use(formData);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    values: integration ? integration : undefined,
  });
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => console.log(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <Card>
          <CardHeader>
            <CardTitle>Edição</CardTitle>
            <CardDescription>Modificar sua conexão</CardDescription>
          </CardHeader>
          <CardContent>
            {formFields.map((fieldItem) => {
              return (
                <FormField
                  key={fieldItem.name}
                  control={form.control}
                  name={fieldItem.name}
                  defaultValue={
                    integration ? integration[fieldItem.name] : undefined
                  }
                  render={({ field }) => FormInput(fieldItem, field)}
                />
              );
            })}
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant={'outline'}>Salvar</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
