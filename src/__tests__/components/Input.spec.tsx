import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { FiUser } from 'react-icons/fi';
import Input from '../../components/input';

let inputElement: HTMLElement;
let containerElement: HTMLElement;
let iconElement: HTMLElement;
let containerError: HTMLElement;

jest.mock('@unform/core', () => {
  return {
    useField: () => {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: 'error',
        registerField: () => ({}),
      };
    },
  };
});

describe('Input Component', () => {
  beforeEach(() => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="E-mail" placeholder="E-mail" icon={FiUser} />,
    );
    inputElement = getByPlaceholderText('E-mail');
    containerElement = getByTestId('input-container');
    iconElement = getByTestId('input-icon');
    containerError = getByTestId('container-error');
  });

  it('should be able to render an input', async () => {
    await waitFor(() => {
      expect(inputElement).toBeTruthy();
      expect(iconElement).toBeTruthy();
      expect(containerError).toBeTruthy();
    });
  });

  it('should render highlight on input focus', async () => {
    fireEvent.focus(inputElement);
    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000;');
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });

    fireEvent.blur(inputElement);
    await waitFor(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000;');
      expect(containerElement).not.toHaveStyle('color: #ff9000;');
    });
  });

  it('should keep input border highlight when input filled', async () => {
    fireEvent.change(inputElement, {
      target: { value: 'jhondoe@example.com.br' },
    });
    fireEvent.blur(inputElement);
    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });
  });
});
