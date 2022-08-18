import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { v4 as uuid } from 'uuid'
import {
  ButtonStart,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmount,
  Separator,
  TaskInput,
} from './styles'
import { useState } from 'react'

const newCycleValidateSchema = zod.object({
  task: zod.string().min(1, 'Informe uma tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'A tarefa tem que durar pelo menos 5 minutos')
    .max(60, 'A tarefa pode durar até 60 minutos'),
})

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, SetActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, SetAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, formState, reset } = useForm({
    resolver: zodResolver(newCycleValidateSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  console.log(formState.errors)

  type NewCycleFormData = zod.infer<typeof newCycleValidateSchema>

  function handleCreateNewCycle({ task, minutesAmount }: NewCycleFormData) {
    const newCycle: Cycle = {
      id: uuid(),
      task,
      minutesAmount,
    }

    setCycles((state) => [...state, newCycle])
    SetActiveCycleId(newCycle.id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalInSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalInSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = Math.floor(currentSeconds % 60)
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>
        <ButtonStart disabled={isSubmitDisable} type="submit">
          <Play />
          Começar
        </ButtonStart>
      </form>
    </HomeContainer>
  )
}
