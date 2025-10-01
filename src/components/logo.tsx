import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      aria-label="Conquistar Enterprises Logo"
      {...props}
      className={cn('fill-current', props.className)}
    >
      <g className="stroke-current" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 15 a 35 35 0 1 0 0.0001 0" fill="none" />
        <path d="M50 15 V 85" fill="none" transform="rotate(25 50 50)"/>
        <path d="M50 50 L 80 50" fill="none" transform="rotate(25 50 50)"/>
      </g>
    </svg>
  );
}
