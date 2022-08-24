import { HandPalm, Play } from 'phosphor-react'

import { useState, createContext } from 'react'

import { ButtonStart, ButtonStop, HomeContainer } from './styles'

import { Countdown } from './components/Countdown'

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
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as ICyclesContext)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, SetActiveCycleId] = useState<string | null>(null)

  //   function handleCreateNewCycle({ task, minutesAmount }: NewCycleFormData) {
  //     const newCycle: Cycle = {
  //       id: uuid(),
  //       task,
  //       minutesAmount,
  //       startDate: new Date(),
  //     }

  //     setCycles((state) => [...state, newCycle])
  //     SetActiveCycleId(newCycle.id)

  //     SetAmountSecondsPassed(0)

  //     reset()
  //   }
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
    SetActiveCycleId(null)
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

  // const task = watch('task')
  // const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(handleCreateNewCycle)} */ action="">
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
        >
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <ButtonStop onClick={handleInterruptCycle} type="submit">
            <HandPalm size={24} />
            Interromper
          </ButtonStop>
        ) : (
          <ButtonStart /* disabled={isSubmitDisable} */ type="submit">
            <Play size={24} />
            Começar
          </ButtonStart>
        )}
      </form>
    </HomeContainer>
  )
}
