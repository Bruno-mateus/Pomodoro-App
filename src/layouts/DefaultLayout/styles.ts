import styled from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 74rem;

  margin: 2.5rem auto;
  padding: 2.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme['gray-800']};
  @media (max-width: 600) {
    width: 100%;
    max-width: 100%;
    margin: auto;
    padding: 0;
  }
`
