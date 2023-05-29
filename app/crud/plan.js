export const plan_crud = {
  create(pay_amount, expenses) {
    let spend = pay_amount

    if (isNaN(pay_amount) || pay_amount <= 0) {
      return
    }

    const steps = []
    for (const expense of expenses) {
      const [amount, template] = expense
      spend -= amount

      steps.push({
        value: amount > 0 ? template.replace('$', `$${amount}`) : template, done: false
      })
    }

    plan_crud.update(spend, steps)

    return { spend, steps }
  },

  read() {
    if ('plan' in localStorage) {
      const { spend, steps } = JSON.parse(localStorage.getItem('plan'))

      return { spend, steps }
    }

    return null
  },

  update(spend, steps) {
    localStorage.setItem('plan', JSON.stringify({ spend, steps }))
  },

  delete() {
    localStorage.removeItem('plan')
  }
}
