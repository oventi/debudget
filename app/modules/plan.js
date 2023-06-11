import { dqs, hide, show } from '../danta/ui/util'
import { _l } from '../danta/ui/lib'
import { expense_row } from '../components/expense_row'
import { get_rest } from '../../lib/rest'
import { session } from './authenticate'
import { load_checklist } from './checklist'

const api = get_rest('/api')

export const create_plan = async ({ username, pay_amount, plan }) => {
  const plan_section = dqs('section#plan')
  const pay_amount_input = dqs('section#plan #pay_amount')
  const expenses_table = dqs('section#plan table tbody')
  const add_expense = dqs('section#plan button#add_expense')
  const create_plan = dqs('section#plan button#create_plan')

  expenses_table.replaceChildren()
  if (plan && Array.isArray(plan)) {
    pay_amount_input.value = pay_amount
    for (const [amount, description] of plan) {
      expenses_table.appendChild(expense_row(amount, description))
    }
  }

  _l(add_expense, 'click', () => expenses_table.appendChild(expense_row()))

  _l(create_plan, 'click', async () => {
    const steps = dqs('section#plan table tbody tr.expense', 'all')
    const pay_amount = parseFloat(pay_amount_input.value)
    const plan = steps
      .map(tr => Array.from(tr.children))
      .map(([td_amount, td_description]) => [
        parseFloat(td_amount.children[0].value) || null,
        td_description.children[0].value || null
      ])
      .filter(([amount, description]) => description !== null)

    await api.patch(`/user/${username}`, { pay_amount, plan })
    const { user } = session.get()
    session.update('user', { ...user, pay_amount, plan })

    load_checklist()
  })

  show(plan_section)
}
