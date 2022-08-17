import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *{
    margin:0 ;
    padding:0 ;
    box-sizing: border-box; 
  }
  :focus{
    outline:none;
    box-shadow: 0 0 0px 2px ${({ theme }) => theme['green-500']};
  }
  body{
    background-color:${({ theme }) => theme['gray-900']};
    -webkit-font-smoothing:antialiased;
    color:${({ theme }) => theme['gray-300']};
  }

  body, input,button,textarea{
    font-family:'Roboto', sans-serif;
    font-weight:400;
    font-size:1rem;
  }

`
