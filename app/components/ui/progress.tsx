import { Progress as ProgressPrimitive } from '@base-ui/react/progress'

import { cn } from '@/lib/utils'

function Progress({
  className,
  indicatorClassName,
  value,
  max = 100,
  ...props
}: ProgressPrimitive.Root.Props & { indicatorClassName?: string }) {
  const percent = value === null ? 0 : Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <ProgressPrimitive.Root data-slot="progress" value={value} max={max} className={cn('w-full', className)} {...props}>
      <ProgressPrimitive.Track className="h-2 overflow-hidden rounded-full bg-soft-row-border">
        <ProgressPrimitive.Indicator
          className={cn('h-full rounded-full bg-accent transition-all duration-700', indicatorClassName)}
          style={{ width: `${percent}%` }}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
