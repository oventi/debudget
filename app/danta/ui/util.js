export const dqs = (query, mode = 'one') => {
  const elements = document.querySelectorAll(query)

  if(mode === 'one') {
    return elements[0]
  }

  if(mode === 'all') {
    return Array.from(elements)
  }

  return null  
}

export const get_input_float = (element) => {
  if (typeof element === "string") {
    element = dqs(element);
  }

  return parseFloat(element.value);
};

export const hide = e => e.classList.add("visually-hidden")

export const show = e => e.classList.remove("visually-hidden")

// string to boolean
export const stb = (string) => {
  try {
    return JSON.parse(string)
  }
  catch(e) {}

  return false
}
