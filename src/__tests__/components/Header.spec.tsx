import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header/Header';

let headerComponent: HTMLElement;

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: {
        avatar_url: 'avatar-url-test',
        name: 'test-user',
      },
    }),
    signOut: jest.fn(),
  };
});

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Test Component Header', () => {
  beforeEach(() => {
    const { getByTestId } = render(<Header />);
    headerComponent = getByTestId('container-header');
  });

  it('should be able render component header.', () => {
    expect(headerComponent).toBeTruthy();
  });
});
