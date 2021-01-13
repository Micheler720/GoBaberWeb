import MockAdapter from 'axios-mock-adapter';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import Dashboard from '../../pages/Dashboard';
import api from '../../services/api';

const mockApi = new MockAdapter(api);

let datePickerMock: HTMLElement;
let titleField: HTMLElement;

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => {
      return {
        user: {
          name: 'Jhonh Doe',
          email: 'jhonhDoe@examplo.com',
          id: 'test',
        },
      };
    },
  };
});

jest.mock('date-fns/esm/locale', () => {
  return {
    ptBR: jest.fn().mockReturnValue({}),
  };
});

jest.mock('date-fns/esm', () => {
  return {
    parseISO: () => ({
      getHours: jest.fn(),
    }),
  };
});

jest.mock('date-fns', () => {
  return {
    isToday: jest.fn(),
    format: jest.fn(),
    isAfter: jest.fn(),
  };
});

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Page Dashboard', () => {
  it('should be able render page Dashboard', async () => {
    mockApi.onGet('/providers/test/month-availability').reply(200, {
      data: [
        {
          day: 1,
          available: false,
        },
        {
          day: 2,
          available: false,
        },
      ],
    });
    mockApi.onGet('/appointments/me').reply(200, {
      data: [
        {
          id: 'test-id',
          user: {
            name: 'name-user',
            avatar_url: 'avatar.jpg',
          },
          date: '2020-07-12',
          hourFormatted: '12/07/2020',
        },
      ],
    });
    const { getByTestId, getByText } = render(<Dashboard />);
    titleField = getByText('Horários agendados');
    await waitFor(() => {
      expect(titleField).toBeTruthy();
    });
  });
});
