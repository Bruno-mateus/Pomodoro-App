import { createContext, ReactNode, useReducer, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { ActionTypes, cyclesReducer } from '../reducers/cycles'

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

    // setCycles((state) => [...state, newCycle])

    dispatch({
      type: ActionTypes.CREATE_NEW_CYCLE,
      payload: { newCycle },
    })

    setAmountSecondsPassed(0)
  }

  function setSecondsPassed(number: number) {
    setAmountSecondsPassed(number)
  }

  function InterruptCurrentCycle() {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: { activeCycleId },
    })
  }

  function markCurrentCycleAsFinished() {
    // setCycles((state) => {
    //   return state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   })
    // })
    dispatch({
      type: ActionTypes.MARK_AS_FINISHED,
      payload: { activeCycleId },
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
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
