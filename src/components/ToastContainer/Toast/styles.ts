import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};
interface ToastProps {
  type?: 'error' | 'success' | 'info';
  hashdescrition: number;
}
export const Container = styled(animated.div)<ToastProps>`
  width: 18rem;
  position: relative;
  padding: 1rem 2rem 1rem 1rem;

  border-radius: 1rem;

  box-shadow: 0.2rem 0.2rem 0.8rem rgba(0, 0, 0, 0.2);

  & + div {
    margin-top: 0.6rem;
  }

  ${props => toastTypeVariations[props.type || 'info']}
  display: flex;

  > svg {
    margin: 0.1rem 0.4rem 0 0.2rem;
  }
  div {
    flex: 1;
    strong {
      font-weight: 700;
    }
    p {
      margin-top: 0.1rem;
      font-size: 0.8rem;
      opacity: 0.6rem;
      line-height: 1.4rem;
    }
  }
  button {
    position: absolute;
    right: 0.8rem;
    background: transparent;
    border: 0;
    color: inherit;
    border: 0;
  }
  ${props =>
    !props.hashdescrition &&
    css`
      align-items: center;
      svg {
        margin-top: 0;
      }
    `}
`;
