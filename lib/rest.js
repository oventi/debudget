export const get_rest = (endpoint, common_headers = {}) => {
  common_headers['Content-Type'] = 'application/json'

  const request = async (method, path, body = {}, headers = {}) => {
    const response = await fetch(`${endpoint}${path}`, {
      method,
      headers: { ...common_headers, ...headers },
      body: JSON.stringify(body)
    })

    //const status = response.status
    //const headers = response.headers

    return response.json()
  }

  return {
    post: async (path, body, headers = {}) => request('POST', path, body, headers),
    patch: async (path, body, headers = {}) => request('PATCH', path, body, headers),
    delete: async (path, headers = {}) => request('DELETE', path, {}, headers)
  }
}
