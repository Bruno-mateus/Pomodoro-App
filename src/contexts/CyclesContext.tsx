import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { v4 as uuid } from 'uuid'
import { cyclesReducer } from '../reducers/cycles/reducer'
import {
  ActionTypes,
  addCreateNewCycle,
  interruptCycleAction,
  markAsFinishedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateJson = localStorage.getItem(
        '@pomodoro-app:cycles-state-1.0.0',
      )

      if (storedStateJson) {
        return JSON.parse(storedStateJson)
      }
      return {
        cycles: [],
        activeCycleId: null,
      }
    },
  )
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState)
    localStorage.setItem('@pomodoro-app:cycles-state-1.0.0', stateJson)
  }, [cyclesState])

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
