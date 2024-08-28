import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/entities';

const spinnerVariants = cva(' rounded-full animate-spin ', {
  variants: {
    size: {
      '2xs': 'border-[2px] w-4 h-4',
      xs: 'border-[3px] w-6 h-6',
      sm: 'border-[4px] w-8 h-8',
      md: 'border-[5px] w-10 h-10',
      lg: 'border-[6px] w-12 h-12',
    },
    variant: {
      default: 'border-[rgba(255,255,255,0.4)] border-t-white',
      secondary: 'border-primary-100 border-t-primary-400',
      tertiary: 'border-secondary-100 border-t-secondary-300',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export default function Spinner({
  size = 'sm',
  variant,
  className,
  ...props
}: SpinnerProps) {
  return (
    <div
      className={cn(spinnerVariants({ size, variant, className }))}
      {...props}
    />
  );
}
