import { spend_notification } from '../components/spend_notification'
import { session } from './authenticate'
import { dqs, hide, show } from '../danta/ui/util'
import { todo_list, bs_button } from '../danta/ui'
import { create_plan } from './plan'

delete_checklist = () => localStorage.removeItem('checklist')

const reset = () => {
  const plan_section = dqs('section#plan')
  const { user } = session.get()

  hide(plan_section)

  const container = dqs('section#checklist > .card-body')
  container.replaceChildren()

  delete_checklist()

  show(plan_section)
  create_plan(user)
}

const update = (spend, steps) => {
  localStorage.setItem('checklist', JSON.stringify({ spend, steps }))
}

const create = (pay_amount, plan) => {
  let spend = pay_amount

  if (isNaN(pay_amount) || pay_amount <= 0) {
    return
  }

  const steps = []
  for (const rule of plan) {
    const [amount, template] = rule
    spend -= amount

    steps.push({
      value: amount > 0 ? template.replace('$', `$${amount}`) : template, done: false
    })
  }

  update(spend, steps)

  return { spend, steps }
}

const read = () => {
  if ('checklist' in localStorage) {
    const { spend, steps } = JSON.parse(localStorage.getItem('checklist'))

    return { spend, steps }
  }

  return null
}

export const load_checklist = () => {
  const plan_section = dqs('section#plan')
  const checklist_section = dqs('section#checklist')

  let checklist = read()
  if (!checklist) {
    const { user: { pay_amount, plan } } = session.get()
    checklist = create(pay_amount, plan)
  }

  hide(plan_section)

  const { spend, steps } = checklist

  const container = dqs('section#checklist > .card-body')
  container.replaceChildren()
  container.appendChild(spend_notification(spend))
  container.appendChild(todo_list('plan', steps, updated_steps => update(spend, updated_steps)))
  container.appendChild(bs_button('Reset', reset, 'danger', ['mt-3']))

  show(checklist_section)
}
