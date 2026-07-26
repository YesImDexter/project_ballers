import { PreviewCard as HoverCardPrimitive } from '@base-ui/react/preview-card'

import { cn } from '@/lib/utils'

const HoverCardRoot = HoverCardPrimitive.Root
const HoverCardTrigger = HoverCardPrimitive.Trigger
const HoverCardPortal = HoverCardPrimitive.Portal

function HoverCardPositioner({
  className,
  sideOffset = 8,
  ...props
}: HoverCardPrimitive.Positioner.Props) {
  return (
    <HoverCardPrimitive.Positioner
      data-slot="hover-card-positioner"
      sideOffset={sideOffset}
      className={cn('z-50', className)}
      {...props}
    />
  )
}

function HoverCardPopup({ className, ...props }: HoverCardPrimitive.Popup.Props) {
  return (
    <HoverCardPrimitive.Popup
      data-slot="hover-card-popup"
      className={cn(
        'rounded-2xl border border-light-border bg-secondary p-3 text-accent shadow-card outline-none',
        className
      )}
      {...props}
    />
  )
}

function HoverCardArrow({ className, ...props }: HoverCardPrimitive.Arrow.Props) {
  return (
    <HoverCardPrimitive.Arrow
      data-slot="hover-card-arrow"
      className={cn('fill-secondary', className)}
      {...props}
    />
  )
}

export {
  HoverCardRoot,
  HoverCardTrigger,
  HoverCardPortal,
  HoverCardPositioner,
  HoverCardPopup,
  HoverCardArrow,
}
