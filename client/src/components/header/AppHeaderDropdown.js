import React from 'react';
import { useNavigate,NavLink } from 'react-router-dom'; // Importa useNavigate
import { logoutRequest } from '../../views/services/auth';
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import { cilLockLocked, cilUser} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import avatar8 from './../../assets/images/avatars/7.jpg';

const AppHeaderDropdown = () => {
  const navigate = useNavigate();

 

  const handleLogout = async () => {
      try {
          await logoutRequest();
          localStorage.removeItem('jwtToken'); // Limpia el token JWT del localStorage
          navigate('/login');
      } catch (error) {
          console.error('Error logging out:', error);
          alert("Error logging out. Please try again.");
      }
  };

   return (
        <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}> {/* <-- AÑADIDO */}
                <CAvatar src={avatar8} size="md" /> {/* <-- AÑADIDO */}
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
            
            <CDropdownItem as={NavLink} to="/account/profile"> {/* <-- Perfil */}
                <CIcon icon={cilUser} className="me-2" />
                Profile
                </CDropdownItem>
                <CDropdownItem onClick={handleLogout}>
                    <CIcon icon={cilLockLocked} className="me-2" />{/* <-- Cerrar sesion */}
                    Log Out
                </CDropdownItem>

            </CDropdownMenu>
        </CDropdown>
    );
};

export default AppHeaderDropdown;