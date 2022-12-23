import { Icon } from '@iconify/react';
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useWindowSize } from 'usehooks-ts';
import clsx from 'clsx'; 

type menu = {
  name: string,
  link: string,
  icon?: string,
}

export type SidebarMenuProps = {
  menu: menu[]
}



export const SidebarMenu = ({menu}: SidebarMenuProps) => {
  
  const [sidebar, setSidebar] = useState(false)

  const { width } = useWindowSize();

  useEffect(() => {
    if (width > 768) {
      setSidebar(true)
    } else {
      setSidebar(false)
    }
  }, [width])
  

  const toggleBar = () => {
    setSidebar(!sidebar)
  }


  return (
    <div className={clsx('ease-out duration-100', sidebar ? 'w-52 relative top-0 h-screen bg-brand-primary rounded-tr-lg rounded-br-lg' : 'w-20 relative top-0 h-screen bg-brand-primary rounded-tr-lg rounded-br-lg')}>
      <div className='flex items-center'>
        <button className='p-4 text-brand-light' onClick={toggleBar}>
          <Icon icon="mdi:menu" width={32}/>
        </button>
        {sidebar && <h1 className='text-4xl text-brand-accent'>
          IPOG
        </h1>}
      </div>
      <ul className=''>
        {menu.map((item, index) => (
          <Link key={index} href={item.link}>
            <li  className='cursor-pointer p-2 flex gap-2 items-center text-brand-light bg-brand-secondary rounded-sm h-16'>
            <Icon icon={item.icon || ''} width={24} className={clsx(sidebar ? 'w-12 h-8' : 'w-12 h-8')} /> 
            {sidebar && <p>{item.name}</p>} 
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}