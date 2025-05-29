import React from 'react'
import { CIcon } from '@coreui/icons-react'
import { BiSolidUserCircle } from 'react-icons/bi'
import { IoLogOutSharp } from 'react-icons/io5'
import { GiTrophyCup, GiWhistle } from 'react-icons/gi'
import { MdOutlineLibraryBooks } from 'react-icons/md'

import '@coreui/coreui/dist/css/coreui.min.css'
import { cilGroup, cilSpeedometer, cilUser } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} className="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavTitle,
    name: 'Registro',
  },
  {
    component: CNavGroup,
    name: 'Usuarios',
    to: '',
    icon: <CIcon icon={cilGroup} style={{ color: 'white' }} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Jugadores',
        to: '/users/players/',
      },
      {
        component: CNavItem,
        name: 'Árbitros',
        to: '/users/referees/',
      },
      {
        component: CNavItem,
        name: 'Delegados',
        to: '/users/treasurers/',
      },
      {
        component: CNavItem,
        name: 'Directores técnicos',
        to: '/users/technicalsd/',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Equipos',
    to: '/users/Team/',
    icon: <CIcon icon={cilGroup} className="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Enfrentamientos',
  },
  {
    component: CNavGroup,
    name: 'Torneos',
    to: '',
    icon: <GiTrophyCup style={{ color: 'white' }} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Definición de torneos',
        to: '/matches/tournament/',
      },
      {
        component: CNavItem,
        name: 'Grupos',
        to: '/matches/groups',
      },
      {
        component: CNavItem,
        name: 'Partidos',
        to: '/matches/clashes',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Resultados',
    to: '/matches/results',
    icon: <MdOutlineLibraryBooks style={{ color: 'white' }} className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pagos',
    to: '/payments/',
    icon: <MdOutlineLibraryBooks style={{ color: 'white' }} className="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Árbitros',
  },
  {
    component: CNavItem,
    name: 'Reportes',
    to: '/referee/',
    icon: <GiWhistle icon={cilUser} className="nav-icon" />,
  },
]

export default _nav
