import { _div, bs_alert, bs_icon } from '../danta/ui'
import { _e, _t } from '../danta/ui/lib'

const td_input = (type, value = '') => {
  const label = type === 'amount' ? '$' : ''
  const colspan = type === 'amount' ? 1 : 2
  let input = null
  const attributes = {
    class: 'form-control', placeholder: label, 'aria-label': label
  }

  switch (type) {
    case 'amount':
      input = _e('input', { ...attributes, type: 'number', value })
      break
    case 'description':
      input = _e('textarea', attributes)
      input.appendChild(_t(value))
      break
  }

  const td = _e('td', { class: type, colspan })
  td.appendChild(input)

  return td
}

export const expense_row = (amount = '', description = '') => {
  const tr = _e('tr', { class: 'expense' })
  tr.appendChild(td_input('amount', amount))
  tr.appendChild(td_input('description', description))

  return tr
}
