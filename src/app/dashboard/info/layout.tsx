'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import { type PropsWithChildren } from 'react'
import { Button } from '~/components/ui/button'
import { useConnect } from '~/hooks/useConnect'

export default function NewLayout({ children }: PropsWithChildren) {
  

  return (
    <>
     <Menu>
      <MenuButton>My account</MenuButton>
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
      {children}
    </>
  )
}
