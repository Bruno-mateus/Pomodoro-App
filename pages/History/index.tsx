import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <HistoryList>
        <h1>Meu histórico</h1>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Taks</td>
              <td>20min</td>
              <td>há 1 dia atrás</td>
              <td>
                <Status statusColor="green">concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Taks</td>
              <td>20min</td>
              <td>há 1 dia atrás</td>
              <td>
                <Status statusColor="green">concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Taks</td>
              <td>20min</td>
              <td>há 1 dia atrás</td>
              <td>
                <Status statusColor="green">concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Taks</td>
              <td>20min</td>
              <td>há 1 dia atrás</td>
              <td>
                <Status statusColor="green">concluído</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
