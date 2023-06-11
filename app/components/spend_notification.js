import { _div, bs_alert, bs_icon } from '../danta/ui'

export const spend_notification = spend => bs_alert(
  [
    bs_icon('emoji-smile-fill'),
    _div(`You can freely spend $${Math.floor(spend)}`, { class: 'mx-2' }),
    bs_icon('cash-stack')
  ],
  'success',
  ['d-flex', 'align-items-center', 'mt-2']
)
