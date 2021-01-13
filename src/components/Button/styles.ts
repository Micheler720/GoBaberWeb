import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  border-radius: 0.6rem;
  background: #ff9000;
  border: 0;
  padding: 0.6rem 1.8rem;
  width: 100%;
  margin-top: 0.8rem;
  color: #312e38;
  font-weight: 500;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
