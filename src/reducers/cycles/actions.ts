import { Cycle } from '../../contexts/CyclesContext'

export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_AS_FINISHED = 'MARK_AS_FINISHED',
}

export function addCreateNewCycle(newCycle: Cycle) {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: { newCycle },
  }
}

export function interruptCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}
export function markAsFinishedAction() {
  return {
    type: ActionTypes.MARK_AS_FINISHED,
  }
}
