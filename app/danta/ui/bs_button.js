import {_t, _e, _l} from './lib'

export const bs_button = (text, action, type = 'primary', extra_classes = []) => {
  let children = []

  if(Array.isArray(text)) { children = text }
  else if(typeof text === 'string') { children.push(_t(text)) }
  else { children.push(text.toString())  }

  const button = _e(
    'button',
    {type: 'button', class: ['btn', `btn-${type}`, ...extra_classes]},
    children
  )

  _l(button, 'click', action)

  return button
}
