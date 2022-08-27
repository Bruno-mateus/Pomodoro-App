import { createContext, ReactNode, useState } from 'react'
import { v4 as uuid } from 'uuid'

interface CreateCycleData {
  task?: string
  minutesAmount?: number
}

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
  createNewCycle: ({ task, minutesAmount }: CreateCycleData) => void
  InterruptCurrentCycle: () => void
}

interface Children {
  children: ReactNode
}

export const CyclesContext = createContext({} as ICyclesContext)

export function CyclesContextProvider({ children }: Children) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const newCycle: Cycle = {
      id: uuid(),
      task,
      minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)

    setAmountSecondsPassed(0)
  }

  function setSecondsPassed(number: number) {
    setAmountSecondsPassed(number)
  }

  function InterruptCurrentCycle() {
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

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        InterruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
