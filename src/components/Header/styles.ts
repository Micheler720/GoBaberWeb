import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.header`
  background-color: #28262e;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderContent = styled.div`
  width: 1120px;
  padding: 32px 0;

  display: flex;
  align-items: center;

  & > img {
    width: 138px;
    height: 80px;
  }
  button {
    background: transparent;
    border: none;
    margin-left: auto;

    & svg {
      color: #999591;
      height: 20px;
      width: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  margin-left: 80px;

  img {
    height: 56px;
    width: 56px;
    border-radius: 50%;
  }
  div {
    margin-left: 25px;
    display: flex;
    flex-direction: column;
    span,
    strong {
      line-height: 12px;
      font-family: 'Roboto Slab';
      font-size: 16px;
    }
    span {
      color: #f4ede8;
    }
    a {
      color: #ff9000;
      text-decoration: none;
      :hover {
        color: ${shade('0.2', '#ff9000')};
      }
    }
  }
`;
