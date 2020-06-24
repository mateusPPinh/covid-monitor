/* eslint-disable import/no-duplicates */
import { createGlobalStyle, css } from 'styled-components';

// import githubBackground from '../assets/logo.svg';
// import githubBackgroundDark from '../assets/logo.svg';

export default createGlobalStyle`
  * {
    margin:0;
    padding:0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
      ${props =>
        props.theme.title === 'dark'
          ? css`
              background: ${props.theme.colors.background};
            `
          : css`
              background: ${props.theme.colors.background};
            `}
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font: 16px Roboto, sans-serif;
  }
  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  button {
    cursor: pointer;
  }
`;
