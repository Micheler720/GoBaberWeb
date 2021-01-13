import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackgroungImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 30rem;
`;

export const Background = styled.img`
  flex: 1;
  background: url(${signInBackgroungImg}) no-repeat center;
  background-size: cover;
`;

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 3rem 0;
    width: 20rem;
    text-align: center;
    h1 {
      margin-bottom: 1.5rem;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 1rem;
      text-decoration: none;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  > a {
    display: flex;
    align-items: center;

    color: #ff9000;
    margin-top: 1rem;
    text-decoration: none;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
    svg {
      margin-right: 0.5rem;
    }
  }
`;
