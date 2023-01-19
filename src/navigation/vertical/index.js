import { Mail, Home, Users, PlusSquare } from 'react-feather'
// import { useTranslation } from "react-i18next"
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
