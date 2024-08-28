'use client';

import { cn } from '@/entities';
import { URLFormType, urlSchema } from '@/entities/models';
import { Input } from '@/shared';
import { Button } from '@/shared/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function PlaywrightRecorder() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<URLFormType>({
    resolver: zodResolver(urlSchema),
    mode: 'onChange',
  });

  const requestRecord = async (data: URLFormType) => {
    try {
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col gap-y-3 w-full justify-center p-3 items-center">
      <h1 className="text-xl font-bold">Please enter the URL to Test</h1>
      <form
        onSubmit={handleSubmit(requestRecord)}
        className="w-full flex justify-center  gap-x-3"
      >
        <div className="flex flex-col gap-y-2 relative">
          <Input
            {...register('url')}
            className={cn(
              'w-[500px] outline-none focus-visible:ring-0',
              errors.url && 'border-red-500',
            )}
            placeholder="https://www.example.com"
            disabled={isSubmitting}
          />
          {errors.url && (
            <span className="pl-1 absolute left-0 top-full text-red-500">
              {errors.url.message}
            </span>
          )}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="w-[125px]"
        >
          Start
        </Button>
      </form>
    </div>
  );
}
