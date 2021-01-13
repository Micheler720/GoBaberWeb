import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Button from '../../components/Button';

let buttonComponent: HTMLElement;

describe('Test Component Button', () => {
  beforeEach(() => {
    const { getByText } = render(<Button> Test </Button>);
    buttonComponent = getByText('Test');
  });

  it('should be able render this component', async () => {
    await waitFor(() => {
      expect(buttonComponent).toBeTruthy();
    });
  });

  it('should be able render this component isLoading', async () => {
    const { getByText } = render(<Button loading> Test </Button>);
    buttonComponent = getByText('carregando');
    await waitFor(() => {
      expect(buttonComponent).toBeTruthy();
    });
  });
});
