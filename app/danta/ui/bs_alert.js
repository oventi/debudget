import {bs_icon} from './bs_icon'
import {_t, _e} from './lib'

export const bs_alert = (text, type = 'primary', extra_classes = []) => {
  let children = []

  if(Array.isArray(text)) { children = text }
  else if(typeof text === 'string') { children.push(_t(text)) }
  else { children.push(text.toString())  }

  return _e(
    'div', 
    {class: ['alert', `alert-${type}`, ...extra_classes], role: 'alert'},
    children
  )  
}
