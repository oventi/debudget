// HTTP response status codes
const METHOD_NOT_ALLOWED = 405

const _lower = string => string.toLowerCase()

const _response = response => {
  return {
    error: (error, status = 500) => response.status(status).json({ error }),
    success: (data, status = 200) => response.status(status).json(data)
  }
}

export const _ = (method, fn) => {
  const allowed_methods = [method].flat().map(_lower)

  return async function (request, response) {
    const { method: request_method, url: path, body } = request
    const method = _lower(request_method)
    const { error, success } = _response(response)

    if (!allowed_methods.includes(method)) {
      const message = `Only ${allowed_methods.join(', ')} allowed for ${path}`
      return error(message, METHOD_NOT_ALLOWED)
    }

    try {
      const ro = await fn(body, method, path)
      if (typeof ro !== 'object') {
        throw new Error(`'${fn.name}' must return an object`)
      }

      const explicit_status = 'status' in ro && 'data' in ro
      explicit_status ? success(ro.data, ro.status) : success(ro)
    }
    catch (err) {
      // TODO: support errors that contain http status code to overwrite 500
      console.error(err)
      error(`Error on request to ${path}`)
    }
  }
}
