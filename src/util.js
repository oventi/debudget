export const dqs = (query) => document.querySelectorAll(query);

export const ael = (element, ev, fn) => {
  if (typeof element === "string") {
    element = dqs(element)[0];
  }

  return element.addEventListener(ev, fn);
};

export const get_input_float = (element) => {
  if (typeof element === "string") {
    element = dqs(element)[0];
  }

  return parseFloat(element.value);
};

export const li = (value) => `<li>${value}</li>`;

export const ol = (values) => `
<ol>
${values.map(li).join("\n")}
</ol>
`;
