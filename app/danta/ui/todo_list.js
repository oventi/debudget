// based on https://getbootstrap.com/docs/5.2/components/list-group/

import {bs_icon} from './bs_icon'
import {_t, _e, _l} from './lib'
import {dqs, stb} from './util'

const done_style = 'text-decoration: line-through; background-color: #999;'

const parse_item = item => {
  let value = item, done = false

  if(typeof item === "object" && "done" in item && "value" in item) {
    value = item.value
    done = item.done
  }

  return { value, done }
}

const get_item = (id, {value, done}) => {
  done = stb(done)
  const attributes = {
    id,
    class: ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'],
    data: {value, done},
    ...(done ? {style: done_style} : {})
  }
  const icon = done ? 'check2-square' : 'square'

  return _e('li', attributes, [value, bs_icon(icon)])
}

const toggle_done = (item) => {
  const done = !stb(item.dataset.done) // change the done value
  const icon = dqs(`#${item.id} > i`)
  const classes = `bi ${done ? 'bi-check2-square' : 'bi-square'}`
  const style = done ? done_style : ''

  item.setAttribute('data-done', done)
  item.setAttribute('style', style)
  icon.className = classes
}

export const todo_list = (id, items, on_click) => {
  const children = items
    .map(item => parse_item(item))
    .map((item, index) => get_item(`${id}-${index}`, item))

  for(const child of children) {
    _l(child, 'click', event => {
      event.stopPropagation()
      const item = event.currentTarget
      toggle_done(item)

      const items = Array.from(dqs(`#${id} > li`, 'all')).map(item => item.dataset)
      on_click(items)
    })
  }

  return _e('ul', {id, class: 'list-group'}, children)
}
