import styled from 'styled-components'

export const FormContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 1.125rem;
  font-weight: bold;
  color: ${({ theme }) => theme['gray-100']};
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme['gray-500']};
  font-weight: bold;
  font-size: inherit;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-bottom: 2px solid ${({ theme }) => theme['green-500']};
  }
  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }
  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme['green-500']};
  }
`

export const MinutesAmount = styled(BaseInput)`
  width: 4rem;
`
export const TaskInput = styled(BaseInput)`
  flex: 1;
  &:-webkit-calendar-picker-indicator {
    display: none !important;
  }
`
