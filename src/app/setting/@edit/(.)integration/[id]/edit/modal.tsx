'use client';

import { ModalForm } from '@/components/modal-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Modal({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState(true);
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setOpened(false);
      router.back();
    } else {
      setOpened(true);
    }
  };

  return (
    <ModalForm
      title={title}
      description={description}
      onOpenChange={handleOpenChange}
      open={opened}
      defaultOpen
      className=""
    >
      {children}
    </ModalForm>
  );
}
