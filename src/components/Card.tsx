import { Edit2Icon, InfoIcon, RefreshCwIcon } from 'lucide-react'
import NextImage from 'next/image'
import Image1 from '~/resources/image.png'
import Image2 from '~/resources/Image2.jpg'
import { Button } from './ui/button'
import { cn } from '~/lib/utils'

type CardBaseProps = React.HTMLAttributes<HTMLDivElement>

export const Card = ({ className, ...props }: CardBaseProps) => {
  return (
    <div
      className={cn('w-[250px] rounded-xl bg-white shadow', className)}
      {...props}
    />
  )
}

export const CardDescription = ({ className, ...props }: CardBaseProps) => {
  return (
    <span className={cn('text-sm', className)} {...props}/>
  )
}

export const CardTitle = ({ className, ...props }: CardBaseProps) => {
  return <h3 className={cn('mb-1 text-lg font-bold', className)} {...props} />
}

export const CardHeader = ({ className, ...props }: CardBaseProps) => {
  return (
    <div
      className={cn('h-64 w-full flex-shrink-0 rounded-xl', className)}
      {...props}
    />
  )
}
