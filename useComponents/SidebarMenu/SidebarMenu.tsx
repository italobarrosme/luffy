import { Icon } from '@iconify/react';
import Link from 'next/link'

type menu = {
  name: string,
  link: string,
  icon?: string,
}

export type SidebarMenuProps = {
  menu: menu[]
}

export const SidebarMenu = ({menu}: SidebarMenuProps) => {
  return (
    <div className="absolute top-0 w-52 h-screen bg-brand-primary rounded-tr-lg rounded-br-lg">
      <div className='flex items-center'>
        <button className='p-4 text-brand-light'>
          <Icon icon="mdi:menu" width={32}/>
        </button>
        <h1 className='text-4xl text-brand-accent'>
          IPOG
        </h1>
      </div>
      <ul className=''>
        {menu.map((item, index) => (
          <Link key={index} href={item.link}>
            <li  className='cursor-pointer p-2 flex gap-2 items-center text-brand-light bg-brand-secondary rounded-sm'>
            <Icon icon={item.icon || ''} /> {item.name} 
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}