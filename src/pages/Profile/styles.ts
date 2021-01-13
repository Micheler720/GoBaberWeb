import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.div`
  background: #28262e;
  height: 144px;

  display: flex;
  align-items: center;

  a {
    max-width: 800px;
    margin-left: 15%;
  }

  a:hover {
    color: ${shade('0.2', '#999591')};
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  margin-top: -93px;
  width: 186px;

  img {
    height: 186px;
    width: 186px;
    border-radius: 50%;
  }
  > label {
    position: absolute;

    height: 48px;
    width: 48px;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #ff9000;

    border: none;

    right: 0;
    bottom: 0;
    cursor: pointer;

    transition: 0.2s;

    :hover {
      background: ${shade('0.2', '#ff9000')};
    }
    input {
      display: none;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  form {
    width: 340px;

    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-family: Roboto Slab;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 26px;
      text-align: left;
      width: 100%;

      color: #f4ede8;

      margin: 20px 0;
    }
  }
`;
