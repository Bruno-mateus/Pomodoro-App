import { useState, createContext } from 'react'

import { HandPalm, Play } from 'phosphor-react'
import { ButtonStart, ButtonStop, HomeContainer } from './styles'

import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { v4 as uuid } from 'uuid'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptCycle?: Date
  finishedDate?: Date
}

interface ICyclesContext {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  setSecondsPassed: (number: number) => void
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as ICyclesContext)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleValidateSchema = zod.object({
    task: zod.string().min(1, 'Informe uma tarefa'),
    minutesAmount: zod
      .number()
      .min(1, 'A tarefa tem que durar pelo menos 5 minutos')
      .max(60, 'A tarefa pode durar até 60 minutos'),
  })

  type NewCycleFormData = zod.infer<typeof newCycleValidateSchema>

  const newCycleForm = useForm({
    resolver: zodResolver(newCycleValidateSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function setSecondsPassed(number: number) {
    setAmountSecondsPassed(number)
  }

  function handleCreateNewCycle({ task, minutesAmount }: NewCycleFormData) {
    const newCycle: Cycle = {
      id: uuid(),
      task,
      minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)

    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          cycle.interruptCycle = new Date()
          return { ...cycle }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) => {
      return state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    })
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <ButtonStop onClick={handleInterruptCycle} type="submit">
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
