import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Dropdown } from 'react-bootstrap';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();
  return (
    <Dropdown.Item
      onClick={() =>
        logout({
          returnTo: window.location.origin as unknown as string,
        } as any)
      }
    >
      Log Out
    </Dropdown.Item>

  );
};

export default LogoutButton;
