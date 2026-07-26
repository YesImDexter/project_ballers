import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex w-fit shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium', {
  variants: {
    variant: {
      default: 'bg-accent text-secondary',
      outline: 'border border-light-border bg-secondary text-muted',
      blue: 'bg-pastel-blue text-signal-blue',
      green: 'bg-pastel-green text-signal-green',
      orange: 'bg-pastel-orange text-signal-orange',
      purple: 'bg-pastel-purple text-signal-purple',
      red: 'bg-pastel-red text-signal-red',
      amber: 'bg-pastel-amber text-signal-amber',
      pink: 'bg-pastel-pink text-signal-pink',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant, className }))} {...props} />
}

export { Badge, badgeVariants }
