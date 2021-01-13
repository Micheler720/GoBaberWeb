import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ForgotPassword from '../../pages/ForgotPassword';
import api from '../../services/api';

let nameField: HTMLElement;
let buttonSubmit: HTMLElement;
const mockAddToast = jest.fn();
const apiMock = new MockAdapter(api);

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockAddToast,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Forgot Password', () => {
  beforeEach(() => {
    mockAddToast.mockClear();
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    nameField = getByPlaceholderText('E-mail');
    buttonSubmit = getByText('Recuperar');
  });

  it('should be able reset password.', async () => {
    apiMock.onPost('password/forgot').reply(200);
    fireEvent.change(nameField, { target: { value: 'jhondoe@example.com' } });
    fireEvent.click(buttonSubmit);
    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });
  it('should be able failled reset password, this display return.', async () => {
    apiMock.onPost('password/forgot').reply(400);
    fireEvent.change(nameField, { target: { value: 'jhondoe@example.com' } });
    fireEvent.click(buttonSubmit);
    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
  it('should not be able invalid credentials.', async () => {
    fireEvent.change(nameField, { target: { value: 'email-invalid' } });
    fireEvent.click(buttonSubmit);
    await waitFor(() => {
      expect(mockAddToast).not.toHaveBeenCalled();
    });
  });
});
