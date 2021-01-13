import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  return (
    <Container className={className} data-testid="container-error">
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
