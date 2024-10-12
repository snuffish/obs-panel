import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'
import { buttonVariants } from './ui/button'

export const dropdownVariants = cva(
    'text-green-500',
    {
      variants: {
        variant: {
          default: 'bg-red'
        }
      },
      defaultVariants: {
        variant: 'default'
      }
    }
)

type DropdownProps = VariantProps<typeof dropdownVariants>

export const Dropdown = ({ variant }: DropdownProps) => {
    return (
        <Menu>
      <MenuButton>
        <span className={cn(buttonVariants({ variant }))}>My account</span>
      </MenuButton>
      <MenuItems anchor="bottom">
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/settings">
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[active]:bg-blue-100" href="/support">
            Support
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/license">
            License
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
    )
}
