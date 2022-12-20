import { Icon } from '@iconify/react';

type navItems = {
  name: string,
  fn: () => void,
  icon?: string,
}

export type NavbarProps = {
  menu: navItems[]
}


export const Navbar = ({menu}: NavbarProps) => {
  return (
    <nav className='absolute top-0 right-0 w-auto h-11 bg-brand-primary rounded-tl-lg rounded-bl-lg'>
      <ul className='flex-row-reverse flex px-4'>
        {menu.map((item, index) => (
          <li key={index} className='select-none cursor-pointer p-2 flex gap-2 items-center text-brand-light hover:text-brand-accent' onClick={item.fn}>
            <Icon icon={item.icon || ''} /> {item.name}
          </li>
        ))}
      </ul>
    </nav>
  )
}