// ** React Imports
import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import jwt_decode from "jwt-decode"
import { useTranslation } from "react-i18next"
import cookies from 'js-cookie'
import i18next from 'i18next'
import '../../../../views/views.scss'
const UserDropdown = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const [logout, setLogout] = useState(false)
  const [userData, setUserData] = useState(null)
  const token = localStorage.getItem("access_token")
  const decoded = jwt_decode(token)
  const currentLanguageCode = cookies.get('i18next') || 'uz'
  const languages = [
    {
      code: 'ru',
      name: 'Rus',
      country_code: 'ru'
    },
    {
      code: 'uz',
      name: 'Uzb',
      country_code: 'uzb'
    }
  ]
  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar
  if (logout === true) {
    localStorage.removeItem("access_token")
    history.push('/login')
  }
  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <div className="head_lang mr-4">
        {languages?.map(({ code, name }) => (
          <a
            key={code}
            onClick={() => { i18next.changeLanguage(code) }}
            style={{
              opacity: currentLanguageCode !== code ? 0.5 : 1
            }}
            className={{ disabled: currentLanguageCode === code }}
          >
            {name}
          </a>
        ))
        }
      </div>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold mb-1/2' style={{marginBottom:"8px"}}>{decoded?.sub} {""}</span>
          <span className='user-status'>{decoded?.roles[0]}</span>
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag={Link} to='#' onClick={e => e.preventDefault()}>
          <User size={14} className='mr-75' />
          <span className='align-middle'>{t('welcome_to_react')}</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='#' onClick={e => e.preventDefault()}>
          <Mail size={14} className='mr-75' />
          <span className='align-middle'>Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='#' onClick={e => e.preventDefault()}>
          <CheckSquare size={14} className='mr-75' />
          <span className='align-middle'>Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='#' onClick={e => e.preventDefault()}>
          <MessageSquare size={14} className='mr-75' />
          <span className='align-middle'>Chats</span>
        </DropdownItem>
        <DropdownItem onClick={() => setLogout(true)}>
          <Power size={14} className='mr-75' />
          <span className='align-middle'>{t('logout')}</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
