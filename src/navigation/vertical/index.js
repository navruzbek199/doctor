import { Mail, Home, Users, PlusSquare } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Bemorlar',
    icon: <Users size={20} />,
    navLink: '/home'
  },
  {
    id: 'doctors',
    title: 'Shifokorlar',
    icon: <PlusSquare size={20} />,
    navLink: '/doctors'
  }
]
