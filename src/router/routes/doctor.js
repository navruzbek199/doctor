import { lazy } from 'react'

const AppRoutes = [
    {
        path: '/doctors',
        component: lazy(() => import('../../views/SecondPage'))
    },
]


export default AppRoutes