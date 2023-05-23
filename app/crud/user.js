export const user_crud = {
  create({name, pay_cycle, expenses}) {
    user.update(name, pay_cycle, expenses)
  },

  read() {
    if('user' in localStorage) {
      const {name, pay_cycle, expenses} = JSON.parse(localStorage.getItem('user'))

      return {name, pay_cycle, expenses}
    }

    return null
  },

  update(name, pay_cycle, expenses) {
    localStorage.setItem('user', JSON.stringify({name, pay_cycle, expenses}))
  },

  delete() {
    localStorage.removeItem('user')
  }
}
