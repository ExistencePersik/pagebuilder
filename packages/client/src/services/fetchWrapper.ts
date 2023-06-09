const URL = process.env.REACT_APP_API_URL

type Options = {
	headers?: { [key: string]: string }
	method?: string
	body?: string | FormData
}

export function fetchWrapper(endpoint: string, options: Options = {}) {
	const { headers, method, body, ...extraOpts } = options

	const token = localStorage.getItem('token')

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
