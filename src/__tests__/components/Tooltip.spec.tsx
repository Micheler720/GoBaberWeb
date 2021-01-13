import React from 'react';
import { render } from '@testing-library/react';
import Tooltip from '../../components/Tooltip';

let tooltipComponent: HTMLElement;
let spanComponent: HTMLElement;

describe('Tooltip Test', () => {
  beforeEach(() => {
    const { getByTestId, getByText } = render(
      <Tooltip title="Teste Tooltip" />,
    );
    tooltipComponent = getByTestId('container-error');
    spanComponent = getByText('Teste Tooltip');
  });

  it('should be able render component.', () => {
    expect(tooltipComponent).toBeTruthy();
    expect(spanComponent).toHaveStyle('background: #ff9000');
  });
});
