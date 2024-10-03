import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "font-semibold inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-button-foreground gap-2 p-4 rounded-xl",
  {
    variants: {
      intent: {
        primary: [
          "bg-green-10",
          "text-white",
          "hover:bg-green-11",
          'disabled:bg-green-4',
          'disabled:text-green-12'
        ],
        outline: [
          'text-green-11',
          'bg-green-3',
          'hover:bg-green-4',
          'border-[1px]',
          'border-green-6',
          'hover:border-green-8'
        ],
        outlineClean: [
          'border',
          'border-neutral-200',
          'bg-white shadow-sm',
          'hover:bg-neutral-100',
          'hover:text-neutral-900',
          'dark:border-neutral-800',
          'dark:bg-neutral-950',
          'dark:hover:bg-neutral-800',
          'dark:hover:text-neutral-50'
        ],
        destructive: [
          'bg-red',
          'text-white'
        ],
        ghost: [
          'bg-opacity-0',
          'hover:bg-green-4'
        ],
        dark: [
          'bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90'
        ]
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      }
    },
    defaultVariants: {
      intent: "primary",
      size: "default",
    },
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean
  isLoading?: boolean
  selected?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, disabled, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ intent, size, className }))}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
