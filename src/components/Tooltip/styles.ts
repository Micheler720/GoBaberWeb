import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  span {
    width: 9rem;
    position: absolute;
    background: #ff9000;
    padding: 0.4rem;
    border-radius: 0.4rem;
    font-size: 0.8rem;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    position: absolute;
    bottom: calc(100% + 0.4rem);
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;
    visibility: hidden;

    &::before {
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
