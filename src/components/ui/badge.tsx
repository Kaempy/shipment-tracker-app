import { TextClassContext } from '@components/ui/text';
import { cn } from '@lib/utils';
import * as Slot from '@rn-primitives/slot';
import type { SlottableViewProps } from '@rn-primitives/types';
import { cva, type VariantProps } from 'class-variance-authority';
import { View } from 'react-native';

const badgeVariants = cva(
  'web:inline-flex items-center rounded-md border-white border border-border px-2.5 py-0.5 web:transition-colors web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2',
  {
    variants: {
      variant: {
        cancelled:
          'bg-[#F4F2F8] border-white web:hover:opacity-80 active:opacity-80',
        received:
          'bg-[#D9E6FD] border-white web:hover:opacity-80 active:opacity-80',
        delivered:
          'bg-[#E3FAD6] border-white web:hover:opacity-80 active:opacity-80',
        error:
          'bg-[#FEE3D4] border-white web:hover:opacity-80 active:opacity-80',
        'on-hold': 'bg-[#FFF3D5] border-white',
      },
    },
    defaultVariants: {
      variant: 'cancelled',
    },
  }
);

const badgeTextVariants = cva('text-xs font-semibold ', {
  variants: {
    variant: {
      cancelled: 'text-[#58536E]',
      received: 'text-[#2F50C1]',
      delivered: 'text-[#208D28]',
      error: 'text-[#D12030]',
      'on-hold': 'text-[#DB7E21]',
    },
  },
  defaultVariants: {
    variant: 'cancelled',
  },
});

type BadgeProps = SlottableViewProps & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, asChild, ...props }: BadgeProps) {
  const Component = asChild ? Slot.View : View;
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <Component
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };
