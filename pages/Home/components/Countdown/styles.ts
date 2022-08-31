import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme['gray-100']};
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 0.5rem;

  span {
    background-color: ${({ theme }) => theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
    @media (max-width: 600px) {
      font-size: 6rem;
      line-height: 4rem;
      align-items: center;
      justify-content: center;
      display: flex;
      padding: 2rem 0.5rem;
    }
  }
`
export const Separator = styled.div`
  padding: 0;
  color: ${({ theme }) => theme['green-500']};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  overflow: hidden;
`
