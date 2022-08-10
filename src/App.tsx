import { ThemeProvider } from 'styled-components'
import { Button } from './components/button/Button'
import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button />
      <Button variant={'secondary'} />
      <Button variant={'danger'} />
      <Button variant={'success'} />

      <GlobalStyles />
    </ThemeProvider>
  )
}

export default App
