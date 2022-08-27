import { HandPalm, Play } from 'phosphor-react'
import { ButtonStart, ButtonStop, HomeContainer } from './styles'

import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { CyclesContext } from '../../src/contexts/CyclesContext'
import { useContext } from 'react'

export function Home() {
  const newCycleValidateSchema = zod.object({
    task: zod.string().min(1, 'Informe uma tarefa'),
    minutesAmount: zod
      .number()
      .min(1, 'A tarefa tem que durar pelo menos 5 minutos')
      .max(60, 'A tarefa pode durar até 60 minutos'),
  })

  type NewCycleFormData = zod.infer<typeof newCycleValidateSchema>

  const { createNewCycle, InterruptCurrentCycle, activeCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidateSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle && !activeCycle.finishedDate ? (
          <ButtonStop onClick={InterruptCurrentCycle} type="submit">
            <HandPalm size={24} />
            Interromper
          </ButtonStop>
        ) : (
          <ButtonStart disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </ButtonStart>
        )}
      </form>
    </HomeContainer>
  )
}
