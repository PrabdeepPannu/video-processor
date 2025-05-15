import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

const Card = ({ title, content }) => {
  return (
    <BootstrapCard className="mb-3">
      <BootstrapCard.Body>
        <BootstrapCard.Title>{title}</BootstrapCard.Title>
        <BootstrapCard.Text>{content}</BootstrapCard.Text>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;