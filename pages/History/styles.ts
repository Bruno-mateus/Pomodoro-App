import styled from 'styled-components'

export const HistoryContainer = styled.main`
  display: flex;
  flex-direction: column;
  padding: 3.5rem;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  margin-top: 2rem;
  overflow: auto;

  table {
    width: 100%;
    min-width: 600px;
    text-align: left;
    border-collapse: collapse;

    th {
      background-color: ${({ theme }) => theme['gray-600']};
      color: ${({ theme }) => theme['gray-100']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }
    td {
      background-color: ${({ theme }) => theme['gray-700']};
      border-top: 4px solid ${({ theme }) => theme['gray-800']};
      padding: 1rem;
      color: ${({ theme }) => theme['gray-300']};
      line-height: 1.6;
      &:first-child {
        padding-left: 1.5rem;
        width: 50%;
      }
      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_COLOR = {
  green: 'green-500',
  yellow: 'yellow-500',
  red: 'red-500',
} as const

interface statusProps {
  statusColor: keyof typeof STATUS_COLOR
}

export const Status = styled.span<statusProps>`
  display: flex;
  align-items: center;
  gap: 0.5em;
  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    background: ${({ theme, statusColor }) => theme[STATUS_COLOR[statusColor]]};
    border-radius: 50%;
  }
`
