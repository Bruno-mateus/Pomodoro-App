import { Cycle } from '../contexts/CyclesContext'

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_AS_FINISHED = 'MARK_AS_FINISHED',
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
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
    case ActionTypes.MARK_AS_FINISHED:
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
}
