import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ResetPassword from '../../pages/ResetPassword';

let passwordInput: HTMLElement;
let passwordConfirmationInput: HTMLElement;
let buttonSubmit: HTMLElement;
const mockAddToast = jest.fn();
const mockHistoryPush = jest.fn();
const mockLocationSearch = jest.fn();
const mockedPost = jest.fn();

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockAddToast,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockHistoryPush,
    }),
    useLocation: () => ({
      search: mockLocationSearch(),
    }),
  };
});

jest.mock('../../services/api', () => ({
  post(__: string, _: object) {
    mockedPost();
  },
}));

describe('Page Reset Password', () => {
  beforeEach(() => {
    mockAddToast.mockClear();
    mockLocationSearch.mockClear();
    mockHistoryPush.mockClear();
  });

  it('should not be able  reset password invalid confirmation password.', async () => {
    mockLocationSearch.mockReturnValue('invalid-token-test');

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    passwordInput = getByPlaceholderText('Senha');
    passwordConfirmationInput = getByPlaceholderText('Confirme sua Senha');
    buttonSubmit = getByText('Resetar a senha');
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: 'invalid-confirmation-password' },
    });

    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(mockHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should be able  reset password.', async () => {
    mockLocationSearch.mockReturnValue('invalid-token-test');

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    passwordInput = getByPlaceholderText('Senha');
    passwordConfirmationInput = getByPlaceholderText('Confirme sua Senha');
    buttonSubmit = getByText('Resetar a senha');
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able reset password invalid token.', async () => {
    mockLocationSearch.mockReturnValue('');

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    passwordInput = getByPlaceholderText('Senha');
    passwordConfirmationInput = getByPlaceholderText('Confirme sua Senha');
    buttonSubmit = getByText('Resetar a senha');
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(mockHistoryPush).not.toHaveBeenCalledWith('/');
    });
  });

  it('should  display an error if login failed.', async () => {
    mockedPost.mockImplementation(() => {
      throw new Error();
    });
    mockLocationSearch.mockReturnValue('invalid-token-test');

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    passwordInput = getByPlaceholderText('Senha');
    passwordConfirmationInput = getByPlaceholderText('Confirme sua Senha');
    buttonSubmit = getByText('Resetar a senha');
    mockLocationSearch.mockReturnValue('');
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
