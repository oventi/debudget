import { dqs, show, hide } from '../danta/ui/util'
import { _l } from '../danta/ui/lib'
import { get_rest } from '../../lib/rest'

const api = get_rest('/api')

export const session = {
  set: (access_token, user) => {
    sessionStorage.clear()

    sessionStorage.setItem('access_token', access_token)
    sessionStorage.setItem('user', JSON.stringify(user))
  },
  get: () => {
    try {
      const access_token = sessionStorage.getItem('access_token')
      const user = JSON.parse(sessionStorage.getItem('user'))

      if (!access_token || !user) { return null }
      return { access_token, user }
    }
    catch (e) { }

    return null
  },
  update: (key, v) => {
    const value = typeof v === 'object' ? JSON.stringify(v) : v
    sessionStorage.setItem(key, value)
  }
}

export const authenticate = ({ on_authenticated, on_error }) => {
  const session_data = session.get()
  if (session_data) return on_authenticated(session_data.user)

  const login_section = dqs('section#login')
  const login_fields = dqs('section#login input', 'all')
  const login_button = dqs('section#login button')

  show(login_section)

  _l(login_button, 'click', async () => {
    const [username, password] = login_fields.map(field => field.value)
    const { access_token, user } = await api.post('/login', { username, password })
    session.set(access_token, user)

    hide(login_section)

    on_authenticated(user)
  })
}
