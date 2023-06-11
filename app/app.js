import { authenticate, load_profile, create_plan, load_checklist } from './modules'

authenticate({
  on_authenticated: user => {
    load_profile(user)

    if (!user.plan) {
      return create_plan(user)
    }

    load_checklist(user.plan)
  },
  on_error: () => { }
})
