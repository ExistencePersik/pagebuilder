const URL = process.env.REACT_APP_API_URL

type Options = {
  headers?: any,
  method?: any,
  body?: any
}

function fetchWrapper(endpoint: string, options: Options = {}) {
  const {
    headers,
    method,
    body,
    ...extraOpts
  } = options

  let token = localStorage.getItem('token')

  const reqOptions: Options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    ...extraOpts,
  }
  if (body) {
    reqOptions.body = body
  }

  if (endpoint === 'api/images/image' || method === 'DELETE') {
    delete reqOptions.headers
  }

  return fetch(`${URL}${endpoint}`, reqOptions)
}

function get(endpoint: string, options: Options = {}) {
  return fetchWrapper(endpoint, { method: 'GET', ...options })
}

function post(endpoint: string, options: Options = {}) {
  return fetchWrapper(endpoint, { method: 'POST', ...options })
}

function put(endpoint: string, options: Options = {}) {
  return fetchWrapper(endpoint, { method: 'PUT', ...options })
}

function _delete(endpoint: string, options: Options = {}) {
  return fetchWrapper(endpoint, { method: 'DELETE', ...options })
}

export {get, post, put, _delete}
