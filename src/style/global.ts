import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: 0;
  }
  body{
    background: #312e38;
    color: #FFF;
    -webkit-font-smoothing: antialiased;
  }
  border-style, input, button{
    font-family: 'Roboto slab', serif;
    font-size: 1rem;
  }
  h1,h2,h3,h4,h5,h6,strong{
    font-weight: 500;
  }
  button{
    cursor: pointer;
  }
`;
