import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Form } from 'react-bootstrap';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Form.Check
      type="switch"
      id="theme-switch"
      label={theme === 'light' ? '' : ''}
      checked={theme === 'dark'}
      onChange={toggleTheme}
    />
  );
};

export default ThemeToggle;