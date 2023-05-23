import {dqs} from './util'

export const _t = value => document.createTextNode(value)

export const _e = (tag, attributes = {}, children = []) => {
  const element = document.createElement(tag)

  for(const name in attributes) {
    let value = attributes[name]

    if(name === 'class' && Array.isArray(value)) {
      value = value.join(' ')
    }

    if(name === 'data' && typeof value === 'object') {
      for(const key in value) {
        element.setAttribute(`data-${key}`, value[key])
      }

      continue
    }

    element.setAttribute(name, value)
  }

  const has_text_child = typeof children === 'string'
  if(has_text_child) { element.textContent = children }
  else {
    for(const child of children) {
      element.appendChild(typeof child === 'string' ? _t(child) : child)
    }
  }

  return element
}

export const _l = (element, ev, fn) => {
  if (typeof element === "string") {
    element = dqs(element);
  }

  return element.addEventListener(ev, fn);
}
