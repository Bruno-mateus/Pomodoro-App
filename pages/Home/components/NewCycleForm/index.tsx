import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../src/contexts/CyclesContext'

import { FormContainer, MinutesAmount, TaskInput } from './styles'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        placeholder="nome para o seu projeto"
        list="task-suggestion"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id="task-suggestion">
        <option value="task 1" />
        <option value="task 2" />
        <option value="task 3" />
      </datalist>
      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmount
        type="number"
        placeholder="60"
        step={1}
        min={1}
        max={60}
        id="minutesAmount"
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
