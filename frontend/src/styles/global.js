import { createGlobalStyle } from 'styled-components';
import { darken, lighten } from 'polished';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  :root {
  --background-color-primary: #22202c;
  --background-color-secondary: #402845;
  --background-header: #222;

  --text-color: #fff;
  --text-color-secondary: rgba(255,255,255,0.7);

  --color-primary-light: ${lighten(0.07, '#f94d6a')};
  --color-primary: #f94d6a;
  --color-primary-dark: ${darken(0.07, '#f94d6a')};
  --color-secondary: #222;

  --color-success: #00c851;
  --color-info: #4dbaf9;
  --color-error: #f94d6a;
  --color-warning: #ffbb33;

  --color-success-dark: ${darken(0.03, '#00c851')};
  --color-info-dark: ${darken(0.03, '#4dbaf9')};
  --color-error-dark: ${darken(0.03, '#f94d6a')};
  --color-warning-dark: ${darken(0.03, '#ffbb33')};
}

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html {
    font-size: 62.5%; /* 10px */
  }

  html, body, #root {
    /* height: 100vh; */
    height: auto;
  }

  body {
    background: linear-gradient(to bottom, var(--background-color-primary), var(--background-color-secondary)) fixed;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
  }

  body, input, button, textarea {
    font: 1.4rem 'Roboto', sans-serif;
    color: var(--text-color);
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none
  }

  button {
    cursor: pointer;
  }

  span.logo {
    font-size: 3.5rem;
    color: var(--color-primary);
    font-weight: bold;
  }

`;
