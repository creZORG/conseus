import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className, ...props }: React.ComponentProps<typeof Image>) {
  return (
    <Image
      src="https://i.postimg.cc/vZ7Y52Mg/image.png"
      alt="Conquistar Enterprises Limited Logo"
      width={100}
      height={100}
      className={cn('w-auto', className)}
      priority
      {...props}
    />
  );
}
