import { _render, tag } from "./vanilla_components";

const is_todo_item = (item) =>
  typeof item === "object" && "done" in item && "value" in item;

const get_list_item = (item, css_classes = [], id = null, data = {}) => {
  const li_class = css_classes.unshift('list-group-item').join(' ')
  const children = Array.isArray(item) ? item.join(' ') : item

  return {
    id: null,
    children: null,
    value: `
    <li class="${li_class}">
      ${children}
    </li>\n
  `,
    render: null
  };
};

const get_todo_list_item = (id, value, done) => {
  const li_class = ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'].join(' ')

  return {
    id,
    children: null,
    value: `
    <li class="${li_class}" data-done="${done}">
      ${value} <i class="bi bi-square"></i>
    </li>\n
    `,
    render: null
  };
}

// items can be an array of strings or todo_items
export const todo_list = (id, items, on_click) => {
  const children = items
    .map((item) => (is_todo_item(item) ? item : { done: false, value: item }))
    .map(({ value, done }, index) => get_todo_list_item(`${id}-${index}`, value, done))

  return {
    id,
    children,
    value: null,
    render: () => `
    <ul class="list-group">
      ${_render(children)}
    </ul>
    `
  };
};

/*
{
  type: 'list_todo'
  id: 'todo_after_pay',
  children: [
    {type: 'list_todo_item', id: 'todo_after_pay1', data:{done:true}, children: null, value: 'pay rent'}
  ],
  value: null
}
*/
