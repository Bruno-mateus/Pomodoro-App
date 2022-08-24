import { FormContainer, MinutesAmount, TaskInput } from './styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function NewCycleForm() {
  const newCycleValidateSchema = zod.object({
    task: zod.string().min(1, 'Informe uma tarefa'),
    minutesAmount: zod
      .number()
      .min(1, 'A tarefa tem que durar pelo menos 5 minutos')
      .max(60, 'A tarefa pode durar até 60 minutos'),
  })

  type NewCycleFormData = zod.infer<typeof newCycleValidateSchema>

  const { register, handleSubmit, watch, formState, reset } = useForm({
    resolver: zodResolver(newCycleValidateSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  console.log(formState.errors)

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
