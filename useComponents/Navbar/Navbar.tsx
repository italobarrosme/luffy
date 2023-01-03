import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

type navItems = {
  name: string,
  fn?: () => void,
  icon?: string,
}

export type NavbarProps = {
  menu: navItems[]
  className?: string,
  scrollPageY?: number,
}


export const Navbar = ({menu, className, scrollPageY = 0}: NavbarProps) => {
  const [navbar, setNavbar] = useState(false)

  useEffect(() => {
    if (scrollPageY === 0) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }, [scrollPageY])


  return (
    <>
    <nav className={clsx('ease-in duration-500', !navbar ? 'opacity-0 absolute top-0 right-0 w-[50%] h-11 bg-brand-primary rounded-l-full z-30' : 'absolute top-0 right-0 w-[50%] h-11 bg-brand-primary rounded-l-full z-30')}>
      <ul className='flex-row-reverse flex px-4'>
        {menu.map((item, index) => {
          return (
            !item.fn ? <li key={index} className=' text-xl select-none p-2 flex gap-2 items-center text-brand-light'>
            <Icon icon={item.icon || ''} /> {item.name}
          </li> :
          <li key={index} className='select-none cursor-pointer p-2 flex gap-2 items-center text-brand-light hover:bg-brand-secondary' onClick={item.fn}>
          <Icon icon={item.icon || ''} /> {item.name}
        </li>
          )
        })}
      </ul>
    </nav>
    </>
  )
}