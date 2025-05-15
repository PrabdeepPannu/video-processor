import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

const Alert = ({ message, variant }) => {
  return (
    <BootstrapAlert variant={variant} className="mt-3">
      {message}
    </BootstrapAlert>
  );
};

export default Alert;