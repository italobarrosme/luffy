type menu = {
  menu: {
    name: string,
    link: string
  }
}

export type SidebarMenuProps = {
  menu: menu[]
}

export const SidebarMenu = ({menu}: SidebarMenuProps) => {
  return (
    <div>
      <ul>
        {menu.map((item, index) => (
          <li key={index}>{item.menu.name}</li>
        ))}
      </ul>
    </div>
  )
}