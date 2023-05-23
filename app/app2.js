import {_l} from './danta_components/lib';
import {dqs, hide, show, get_input_float} from './danta_components/util';
import {_div, bs_alert, bs_button, bs_icon, todo_list} from './danta_components'
import {spend_notification} from './app_components/spend_notification'
import {user_crud} from './dao/user'
import {plan_crud} from './dao/plan'

/* elements ***************************************************************** */

const sections = {
  user: dqs('section#user'),
  salary: dqs('section#salary'),
  plan: dqs('section#plan')
}

/* functions **************************************************************** */

const display_plan = ({spend, steps}) => {
  hide(sections.salary)

  const container = dqs('section#plan > .card-body')
  container.replaceChildren()
  container.appendChild(spend_notification(spend))
  container.appendChild(todo_list("plan", steps, updated_steps => plan.update(spend, updated_steps)))
  container.appendChild(bs_button('Reset', reset, 'danger', ['mt-3']))

  show(sections.plan)
}

const reset = () => {
  hide(sections.plan)

  const container = dqs('section#plan > .card-body')
  container.replaceChildren()

  plan.delete()

  show(sections.salary)
}

const login = () => {
  user_crud.delete()
  plan_crud.delete()

  const uploader = dqs('input#user_profile')

  _l(uploader, 'change',  async () => {
    const notification = bs_alert('Saving profile...', 'info', ['mt-2'])
    sections.user.appendChild(notification)

    const data = JSON.parse(await uploader.files[0].text())
    user.create(data)

    notification.textContent = 'Profile saved.'
    notification.classList.replace('alert-info', 'alert-success')

    hide(sections.user)
    app_run()
  }, false)

  show(sections.user)
}

const build_plan = (pay_cycle, expenses) => {
  dqs('#salary label').textContent =  `${pay_cycle} pay`

  _l("section#salary button", "click", () => {
    const pay_amount = get_input_float("#pay_amount")
    const budget_plan = plan.create(pay_amount, expenses)

    hide(sections.salary)
    app_run()
  })

  show(sections.salary)
}

/* application run ********************************************************** */

// wait_for_user({fn: login, then: load_profile})

const sha256 = async text => {
  const tb = new TextEncoder().encode(text)
  const hb = await window.crypto.subtle.digest('SHA-256', tb)

  return Array.from(new Uint8Array(hb))
    .map(e => e.toString(16).padStart(2, '0'))
    .join('')
}

const app_run = async () => {
  localStorage.clear()

  return show(dqs('section#login'))
  
  try {
    const hash = await sha256('deborahArtemis123')
    console.log('HASH', hash)
    dqs('section#user').appendChild(_div(hash))
    
    // c0ff4431d30595156f7b2c3459a0d6e65c88b926cd16edeb1fd93defd7be2e28
    // c0ff4431d30595156f7b2c3459a0d6e65c88b926cd16edeb1fd93defd7be2e28



  }
  catch(e) {
    console.log(e)
  }
  
  
  
  
  
  // check if user is logged in
  const user = user_crud.read()
  if(!user) {
    return login()
  }

  // load profile information and greet user
  const {name, pay_cycle, expenses} = user_data
  dqs('div#greeting').textContent = `Kia ora ${name}`

  // check if plan exists
  const budget_plan = plan.read()
  if(!budget_plan) {
    plan.delete()

    return build_plan(pay_cycle, expenses)
  }

  display_plan(budget_plan)
}
app_run()
