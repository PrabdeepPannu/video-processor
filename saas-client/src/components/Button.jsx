import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = ({ label, onClick }) => {
  return (
    <BootstrapButton variant="primary" onClick={onClick}>
      {label}
    </BootstrapButton>
  );
};

export default Button;