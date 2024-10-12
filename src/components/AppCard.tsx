import { cn } from '~/lib/utils'

type CardBaseProps = React.HTMLAttributes<HTMLDivElement>

export const AppCard = ({ className, ...props }: CardBaseProps) => {
  return (
    <div
      className={cn('w-[250px] rounded-xl bg-white shadow', className)}
      {...props}
    />
  )
}

export const AppCardDescription = ({ className, ...props }: CardBaseProps) => {
  return <span className={cn('text-sm', className)} {...props} />
}

export const AppCardTitle = ({ className, ...props }: CardBaseProps) => {
  return <h3 className={cn('mb-1 text-lg font-bold', className)} {...props} />
}

export const AppCardHeader = ({ className, ...props }: CardBaseProps) => {
  return (
    <div
      className={cn('h-64 w-full flex-shrink-0 rounded-xl', className)}
      {...props}
    />
  )
}
