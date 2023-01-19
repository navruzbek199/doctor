import { lazy } from 'react'

// ** Document title
const TemplateTitle = 'e-doctor'

// ** Default Route
const DefaultRoute = '/login'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/doctors',
    component: lazy(() => import('../../views/SecondPage'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error'))
    // layout: 'BlankLayout'
  },
  {
    path: '/createdoctor',
    component: lazy(() => import('../../views/DoctorPage/CreateDoctor'))
    // meta: {
    //   navLink: '/doctors/createdoctor'
    // }
    // layout: 'BlankLayout'
  },
  {
    path: '/send/:userId',
    component: lazy(() => import('../../views/SendPage'))
  },
  {
    path: '/passwordpage/:userId',
    component: lazy(() => import('../../views/PasswordPage'))
  },
  {
    path: '/doctoredit/:userId',
    component: lazy(() => import('../../views/DoctorPage/DoctorEdit'))
  }
]

export { DefaultRoute, TemplateTitle, Routes }
