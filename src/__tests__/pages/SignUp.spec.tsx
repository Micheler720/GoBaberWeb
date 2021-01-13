import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '../../pages/SignUp';

const mockedHistory = jest.fn();
const mockedAddToast = jest.fn();
const mockedPost = jest.fn();

let nameField: HTMLElement;
let emailField: HTMLElement;
let passwordField: HTMLElement;
let buttonSubmit: HTMLElement;

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistory,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../services/api', () => ({
  post(__: string, _: object) {
    mockedPost();
  },
}));

describe('Page SignInUp', () => {
  beforeEach(() => {
    mockedPost.mockClear();
    mockedHistory.mockClear();
    mockedAddToast.mockClear();

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    nameField = getByPlaceholderText('Nome');
    emailField = getByPlaceholderText('E-mail');
    passwordField = getByPlaceholderText('Senha');
    buttonSubmit = getByText('Cadastrar');
  });

  it('should be able register new user', async () => {
    fireEvent.change(nameField, { target: { value: 'Teste-name-User' } });
    fireEvent.change(emailField, { target: { value: 'jhonhdoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
      expect(mockedHistory).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able register user with credentials invalid.', async () => {
    fireEvent.change(nameField, { target: { value: 'Teste-name-User' } });
    fireEvent.change(emailField, { target: { value: 'invalid-email-user' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(mockedAddToast).not.toHaveBeenCalled();
      expect(mockedHistory).not.toHaveBeenCalled();
    });
  });

  it('should  display an error if login failed.', async () => {
    mockedPost.mockImplementation(() => {
      throw new Error();
    });
    fireEvent.change(nameField, { target: { value: 'Test-name-user' } });
    fireEvent.change(emailField, { target: { value: 'jhonhdoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenLastCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
