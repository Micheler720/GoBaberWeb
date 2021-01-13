import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Toast from '../../components/ToastContainer/Toast';

let toastItem: HTMLElement;
let buttonClose: HTMLElement;
const mockedRemoveToast = jest.fn();

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      removeToast: mockedRemoveToast,
    }),
  };
});

describe('Component Toast Item', () => {
  beforeEach(() => {
    mockedRemoveToast.mockClear();
    const { getByTestId } = render(
      <Toast
        style={{}}
        toast={{
          id: 'toast-container-item',
          type: 'error',
          title: 'Test-Message',
        }}
      />,
    );
    toastItem = getByTestId('toast-container-item');
    buttonClose = getByTestId('close-toast-item');
  });

  it('should be able render component ToastContainer item.', () => {
    expect(toastItem).toBeTruthy();
  });

  it('should be able remove toast timeout 3 seconds.', async () => {
    await waitFor(
      () => {
        expect(mockedRemoveToast).toHaveBeenCalledWith('toast-container-item');
      },
      { timeout: 4000 },
    );
  });
  it('should be able remove toast onclick button.', () => {
    fireEvent.click(buttonClose);
    expect(mockedRemoveToast).toHaveBeenCalledWith('toast-container-item');
  });

  it('should be able type information description.', () => {
    const { getByText } = render(
      <Toast
        style={{}}
        toast={{
          id: 'toast-container-item-default',
          title: 'Test-Message',
          description: 'Test-toast-Description',
        }}
      />,
    );
    const toastDescription = getByText('Test-toast-Description');
    fireEvent.click(buttonClose);
    expect(toastDescription).toBeTruthy();
  });
});
