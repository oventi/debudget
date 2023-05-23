import {_e} from './lib';

import {bs_alert} from './bs_alert'
import {bs_button} from './bs_button'
import {bs_icon} from './bs_icon'
import {todo_list} from './todo_list'

const _div = (children, attributes = {}) => _e('div', attributes, children)

export {
  _div,

  bs_alert,
  bs_button,
  bs_icon,

  todo_list
}
