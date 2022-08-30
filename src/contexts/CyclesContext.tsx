import { createContext, ReactNode, useReducer, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { cyclesReducer } from '../reducers/cycles/reducer'
import {
  ActionTypes,
  addCreateNewCycle,
  interruptCycleAction,
  markAsFinishedAction,
} from '../reducers/cycles/actions'

interface CreateCycleData {
  task?: string
  minutesAmount?: number
}

export interface Cycle {
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
  cycles: Cycle[]
}

interface Children {
  children: ReactNode
}

export const CyclesContext = createContext({} as ICyclesContext)

export function CyclesContextProvider({ children }: Children) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const newCycle: Cycle = {
      id: uuid(),
      task,
      minutesAmount,
      startDate: new Date(),
    }

    dispatch(addCreateNewCycle(newCycle))

    setAmountSecondsPassed(0)
  }

  function setSecondsPassed(number: number) {
    setAmountSecondsPassed(number)
  }

  function InterruptCurrentCycle() {
    dispatch(interruptCycleAction())
  }

  function markCurrentCycleAsFinished() {
    dispatch(markAsFinishedAction())
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
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
