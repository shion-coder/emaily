import { createGlobalStyle, keyframes } from 'styled-components';
import { normalize } from 'styled-normalize';

/* -------------------------------------------------------------------------- */

const fadeIn = keyframes`
  from {
      opacity: 0;
  }

  to {
      opacity: 1;
  }
`;

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
    background: transparent;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: sans-serif;
    animation: ${fadeIn} 1s ease;
  }

  a {
    text-decoration: none;
  }
`;
