import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ToastContainer from '../../components/ToastContainer';

let toastContainer: HTMLElement;
let toastContainerItem: HTMLElement;

describe('Test component Toast Container', () => {
  beforeEach(() => {
    const { getByTestId } = render(
      <ToastContainer
        messages={[
          { id: 'toast-container-item', type: 'error', title: 'Test-Message' },
        ]}
      />,
    );
    toastContainer = getByTestId('toast-container');
    toastContainerItem = getByTestId('toast-container-item');
  });
  it('should be able render component.', async () => {
    await waitFor(() => {
      expect(toastContainer).toBeTruthy();
      expect(toastContainerItem).toBeTruthy();
    });
  });
});
