import {_l} from './danta/ui/lib';
import {dqs, show} from './danta/ui/util';

import {user_crud} from './crud/user'
import {plan_crud} from './crud/plan'

const sha256 = async text => {
  const tb = new TextEncoder().encode(text)
  const hb = await window.crypto.subtle.digest('SHA-256', tb)

  return Array.from(new Uint8Array(hb))
    .map(e => e.toString(16).padStart(2, '0'))
    .join('')
}

/* elements ***************************************************************** */

// TODO: add integration with https://jsonbin.io/app/bins

/* functions **************************************************************** */

const login = async () => {
  const user = user_crud.read()
  if(user && typeof user === 'object') { return user }

  user_crud.delete()
  plan_crud.delete()
  
  const section = dqs('section#login')
  const button = dqs('section#login button')

  show(section)

  const response = await fetch('/api/hola')
  dqs('section#login input').value = JSON.stringify(await response.json())


  _l(button, 'click',  async () => {
    const [username, password] = dqs('section#login input', 'all').map(field => field.value)
    console.log(username, password)
  })

  /*
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
  */

  return null
}

/* ************************************************************************** */

localStorage.clear()

const app_run = async (next_step = 'login') => {
  switch(next_step) {
    case 'login':
      const user = await login()
      if(!user) return

    case 'other':
      console.log('OTHER')
      break;
  }
}
app_run()
