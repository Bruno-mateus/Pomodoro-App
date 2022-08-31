import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const BaseButtonCountDown = styled.button`
  width: 100%;
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  color: ${({ theme }) => theme['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  @media (max-width: 600px) {
    width: 50%;
  }
`

export const ButtonStart = styled(BaseButtonCountDown)`
  background-color: ${({ theme }) => theme['green-500']};
  &:not(disabled):hover {
    background-color: ${({ theme }) => theme['green-700']};
  }
`
export const ButtonStop = styled(BaseButtonCountDown)`
  background-color: ${({ theme }) => theme['red-500']};
  &:hover {
    background-color: ${({ theme }) => theme['red-700']};
  }
`
