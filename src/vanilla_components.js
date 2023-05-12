// https://getbootstrap.com/docs/5.2/components/list-group/

export const tag = {
  open: (tag_name, attributes) => {

    //<li class="list-group-item ${li_classes.join(" ")}">

  },
  close: () => {}
}



//////////////////////////////////////////////////

const is_component = (component) =>
  typeof component === "object" &&
  "id" in component &&
  "children" in component &&
  "value" in component &&
  "render" in component;

export const _render = (component) => {
  if (typeof component === "string") return component;

  if (Array.isArray(component)) {
    return component.map(_render).join("\n");
  }

  if (is_component(component)) {
    return component.value || component.render();
  }

  console.log(component);
  throw new Error(`${component.toString()} is not a valid component`);
};

export const list_group2 = (items) => ({
  type: "list_group",
  children: items,
  render: () => `
    <ul>
      ${_render(items)}
    </ul>
  `
});

const get_list_item = (item, li_classes = [], li_data = {}) => {
  console.log(item, li_classes);
  return `
  <li class="list-group-item ${li_classes.join(" ")}">
    ${Array.isArray(item) ? item.join(" ") : item}
  </li>\n
`;
};

const get_list_group = (list_element, items, list_element_classes = []) => `
  <${list_element} class="list-group ${list_element_classes.join(" ")}">  
    ${items.map(get_list_item).join("")}
  </${list_element}>
`;

////////////////////////////////////////////////////////////////////////////

// Basic example
export const list_group = (items) => get_list_group("ul", items);

// Numbered
export const list_group_numbered = (items) =>
  get_list_group("ol", items, ["list-group-numbered"]);

/*

//////////////////////////////////////////////////

// Contextual classes 

<ul class="list-group">
  <li class="list-group-item">A simple default list group item</li>

  <li class="list-group-item list-group-item-primary">A simple primary list group item</li>
  <li class="list-group-item list-group-item-secondary">A simple secondary list group item</li>
  <li class="list-group-item list-group-item-success">A simple success list group item</li>
  <li class="list-group-item list-group-item-danger">A simple danger list group item</li>
  <li class="list-group-item list-group-item-warning">A simple warning list group item</li>
  <li class="list-group-item list-group-item-info">A simple info list group item</li>
  <li class="list-group-item list-group-item-light">A simple light list group item</li>
  <li class="list-group-item list-group-item-dark">A simple dark list group item</li>
</ul>


*/
