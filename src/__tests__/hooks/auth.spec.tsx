import { act, renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/auth';

import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth Hook ', () => {
  it('should be able to sign in.', async () => {
    const apiResponse = {
      user: {
        id: '1234',
        email: 'jhonDoe@exemplo.com',
        password: '123456',
      },
      token: 'token-132',
    };
    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'jhonDoe@exemplo.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );

    expect(result.current.user.email).toEqual('jhonDoe@exemplo.com');
  });

  it('should restore saved data from storage when auth inits', async () => {
    const apiResponse = {
      user: {
        id: '1234',
        email: 'jhonDoe@exemplo.com',
        password: '123456',
        name: 'Jhon Doe',
      },
      token: 'token-132',
    };
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:user':
          return JSON.stringify(apiResponse.user);
          break;
        case '@GoBarber:token':
          return apiResponse.token;
          break;
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('jhonDoe@exemplo.com');
    expect(result.current.user.name).toEqual('Jhon Doe');
  });

  it('should be able siginIn out', async () => {
    const apiResponse = {
      user: {
        id: '1234',
        email: 'jhonDoe@exemplo.com',
        password: '123456',
        name: 'Jhon Doe',
      },
      token: 'token-132',
    };
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:user':
          return JSON.stringify(apiResponse.user);
          break;
        case '@GoBarber:token':
          return apiResponse.token;
          break;
        default:
          return null;
      }
    });
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalled();
    expect(result.current.user).toBeUndefined();
  });

  it('should be able update user data.', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const updatedUser = {
      name: 'Teste Update',
      email: 'teste@example.com',
      id: '1234',
      avatar_url: 'teste.jpg',
    };

    act(() => {
      result.current.updateUser(updatedUser);
    });

    expect(setItemSpy).toHaveBeenCalled();
    expect(result.current.user).toEqual(updatedUser);
  });
});
