import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 80px;
  height: 60px;
  background-color: ${({ theme }) => theme['green-700']};
  color: ${({ theme }) => theme.white};
  border: none;
  margin-right: 1rem;
`
