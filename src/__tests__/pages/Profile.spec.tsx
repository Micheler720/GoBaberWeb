import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import Profile from '../../pages/Profile';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

let nameField: HTMLElement;
let passswordField: HTMLElement;
let passwordConfirmationField: HTMLElement;
let emailField: HTMLElement;
let avatarField: HTMLElement;
let buttonSubmit: HTMLElement;
let oldPassswordField: HTMLElement;

const mockedAddToast = jest.fn();
const mockedHistoryPush = jest.fn();

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: {
        name: 'Teste User',
        email: 'teste@exemplo.com',
        avatar_url: 'avatar-test',
      },
      updateUser: () => {
        jest.fn();
      },
    }),
  };
});

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
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Page Profile', () => {
  beforeEach(() => {
    mockedAddToast.mockClear();

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Profile />,
    );

    nameField = getByTestId('name-test');
    passswordField = getByPlaceholderText('Nova Senha');
    oldPassswordField = getByPlaceholderText('Senha Atual');
    passwordConfirmationField = getByPlaceholderText('Confirmar Senha');
    emailField = getByTestId('email-test');
    avatarField = getByTestId('avatar-update');

    buttonSubmit = getByText('Confirmar mudanças');
  });

  it('should be able  user update.', async () => {
    apiMock.onPut('profile').reply(200, {});
    fireEvent.change(nameField, { target: { value: 'Test-name' } });
    fireEvent.change(passswordField, { target: { value: '123456' } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: '123456' },
    });
    fireEvent.change(emailField, { target: { value: 'jhonDoe@exemplo.com' } });
    fireEvent.change(oldPassswordField, { target: '153426' });
    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should  display an error if login failed.', async () => {
    apiMock.onPut('profile').reply(400, {});
    fireEvent.change(nameField, { target: { value: 'Test-name' } });
    fireEvent.change(passswordField, { target: { value: '123456' } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: '123456' },
    });
    fireEvent.change(emailField, { target: { value: 'jhonDoe@exemplo.com' } });
    fireEvent.change(oldPassswordField, { target: '153426' });

    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
      expect(mockedHistoryPush).not.toHaveBeenCalledWith();
    });
  });

  it('should not be able update password not information old password.', async () => {
    fireEvent.change(nameField, { target: { value: 'Test-name' } });
    fireEvent.change(passswordField, { target: { value: '123456' } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: '123456' },
    });
    fireEvent.change(emailField, { target: { value: 'jhonDoe@exemplo.com' } });

    fireEvent.click(buttonSubmit);
    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalledWith();
    });
  });

  it('should not be able update password not information confirmation password.', async () => {
    fireEvent.change(nameField, { target: { value: 'Test-name' } });
    fireEvent.change(passswordField, { target: { value: '123456' } });
    fireEvent.change(oldPassswordField, {
      target: { value: '123456' },
    });
    fireEvent.change(emailField, { target: { value: 'jhonDoe@exemplo.com' } });

    fireEvent.click(buttonSubmit);
    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalledWith();
    });
  });

  it('should be able update avatar.', async () => {
    apiMock.onPatch('users/avatar').reply(200, {});
    fireEvent.change(avatarField, { target: { files: ['image1'] } });
    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });
});
