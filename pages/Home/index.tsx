import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  ButtonStart,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmount,
  Separator,
  TaskInput,
} from './styles'

const newCycleValidateSchema = zod.object({
  task: zod.string().min(1, 'Informe uma tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'A tarefa tem que durar pelo menos 5 minutos')
    .max(60, 'A tarefa pode durar até 60 minutos'),
})

export function Home() {
  const { register, handleSubmit, watch, formState, reset } = useForm({
    resolver: zodResolver(newCycleValidateSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  type NewCycleFormData = zod.infer<typeof newCycleValidateSchema>

  function createNewCycle(data: NewCycleFormData) {
    console.log(data)
    reset()
  }
  console.log(formState.errors)

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="nome para o seu projeto"
            list="task-suggestion"
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
            step={5}
            max={60}
            id="minutesAmount"
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <ButtonStart disabled={isSubmitDisable} type="submit">
          <Play />
          Começar
        </ButtonStart>
      </form>
    </HomeContainer>
  )
}
