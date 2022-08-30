import { Cycle } from '../../contexts/CyclesContext'
import { ActionTypes } from './actions'
import { produce } from 'immer'

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      //   return {
      //     ...state,
      //     cycles: [...state.cycles, action.payload.newCycle],
      //     activeCycleId: action.payload.newCycle.id,
      //   }
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      //   return {
      //     ...state,
      //     cycles: state.cycles.map((cycle) => {
      //       if (cycle.id === state.activeCycleId) {
      //         cycle.interruptCycle = new Date()

      //         return { ...cycle }
      //       } else {
      //         return cycle
      //       }
      //     }),
      //     activeCycleId: null,
      //   }

      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (currentCycleIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptCycle = new Date()
      })
    }
    case ActionTypes.MARK_AS_FINISHED: {
      //   return {
      //     ...state,
      //     cycle: state.cycles.map((cycle) => {
      //       if (cycle.id === state.activeCycleId) {
      //         cycle.finishedDate = new Date()

      //         return { ...cycle }
      //       } else {
      //         return { cycle }
      //       }
      //     }),
      //     activeCycleId: null,
      //   }
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (currentCycleIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }
}
