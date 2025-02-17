import React from 'react';
import { CIcon } from '@coreui/icons-react';
import { BiSolidUserCircle } from "react-icons/bi";
import { IoLogOutSharp } from "react-icons/io5";
import { GiTrophyCup, GiWhistle  } from "react-icons/gi";
import { MdOutlineLibraryBooks } from "react-icons/md";

import '@coreui/coreui/dist/css/coreui.min.css';
import {
  cilGroup,
  cilSpeedometer,
  cilUser,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

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
    name: 'Registration',
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users/',
    icon: <CIcon icon={cilUser} className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Team',
    to: '/users/Team/',
    icon: <CIcon icon={cilGroup} className="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Matches',
  },
  {
    component: CNavGroup,
    name: 'Tournaments',
    to: '',
    icon: <GiTrophyCup style={{ color: 'white' }} className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Define tournaments',
        to: '/matches/tournament/',
      },
      {
        component: CNavItem,
        name: 'Groups',
        to: '/matches/groups',
      },
      {
        component: CNavItem,
        name: 'Clashes',
        to: '/matches/clashes',
      },
      
    ],
  },
  
  {
    component: CNavItem,
    name: 'Results',
    to: '/matches/results',
    icon: <MdOutlineLibraryBooks style={{ color: 'white' }} className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Payments',
    to: '/payments/',
    icon: <MdOutlineLibraryBooks style={{ color: 'white' }} className="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Referee',
  },
  {
    component: CNavItem,
    name: 'Report',
    to: '/users/',
    icon: < GiWhistle icon={cilUser} className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/account/profile', 
    icon: <BiSolidUserCircle style={{ color: '#fff', fontSize: '1.25rem', width: '25px', height: '25px' }} />,
  },
  {
    component: CNavItem,
    name: 'Log out',
    to: '/users/',
    icon: <IoLogOutSharp style={{ color: '#fff', fontSize: '1.25rem', width: '25px', height: '25px' }} />,
  },
];

export default _nav;
