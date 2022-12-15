export type NavbarProps = {
  menu: string[]
}


export const Navbar = ({menu}: NavbarProps) => {
  return (
    <nav>
      <ul>
        {menu.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </nav>
  )
}