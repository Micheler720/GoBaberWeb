import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 0.6rem;
  background: #232129;
  border: 0.2rem solid #232129;
  padding: 0.6rem;
  width: calc(100% - 1.6rem);
  display: flex;
  align-items: center;
  color: #666360;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}
  input {
    background: transparent;
    height: 100%;
    border: none;
    color: #f4ede8;
    flex: 1;
    &::placeholder {
      color: #666360;
    }
  }
  & + div {
    margin-top: 0.4rem;
  }
  svg {
    margin-right: 0.4rem;
  }
`;
export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 1rem;
  svg {
    margin: 0;
  }
  span {
    background: #c53030 !important;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
