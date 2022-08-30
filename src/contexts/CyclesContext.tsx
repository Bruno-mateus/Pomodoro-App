import { createContext, ReactNode, useReducer, useState } from 'react'
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
  cycles: Cycle[]
}

interface Children {
  children: ReactNode
}
interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const CyclesContext = createContext({} as ICyclesContext)

export function CyclesContextProvider({ children }: Children) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'CREATE_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          }

        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                cycle.interruptCycle = new Date()

                return { ...cycle }
              } else {
                return cycle
              }
            }),
            activeCycleId: null,
          }
        case 'MARK_AS_FINISHED':
          return {
            ...state,
            cycle: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                cycle.finishedDate = new Date()

                return { ...cycle }
              } else {
                return { cycle }
              }
            }),
            activeCycleId: null,
          }
        default:
          return state
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )

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
      type: 'CREATE_NEW_CYCLE',
      payload: { newCycle },
    })

    setAmountSecondsPassed(0)
  }

  function setSecondsPassed(number: number) {
    setAmountSecondsPassed(number)
  }

  function InterruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
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
      type: 'MARK_AS_FINISHED',
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
