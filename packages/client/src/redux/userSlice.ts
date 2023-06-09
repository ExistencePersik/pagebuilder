import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FieldValues } from 'react-hook-form'
import jwtDecode from 'jwt-decode'
import { IElement, IUser, IUserState } from '../models/models'
import { fetchWrapper } from '../services/fetchWrapper'

const userState: IUserState = {
	user: {} as IUser,
	isAuth: false,
	isLoginError: undefined,
	isSignUpError: undefined,
	isLoading: false,
	userPages: [],
	userPageId: 0,
}

export const registration = createAsyncThunk<IUser, FieldValues, { rejectValue: string }>(
	'user/registration',
	async function (data, { rejectWithValue }) {
		const response = await fetchWrapper('api/user/signup', {
			method: 'POST',
			body: JSON.stringify({ ...data, role: 'USER' }),
		})

		const _data = await response.json()

		if (_data.token) {
			localStorage.setItem('token', _data.token)
		}

		if (!response.ok) {
			return rejectWithValue(_data.message)
		}
		return await jwtDecode(_data.token)
	},
)

export const login = createAsyncThunk<IUser, FieldValues, { rejectValue: string }>(
	'user/login',
	async function (data, { rejectWithValue }) {
		const response = await fetchWrapper('api/user/login', {
			method: 'POST',
			body: JSON.stringify({ ...data }),
		})

		const _data = await response.json()

		if (_data.token) {
			localStorage.setItem('token', _data.token)
		}

		if (!response.ok) {
			return rejectWithValue(_data.message)
		}

		return await jwtDecode(_data.token)
	},
)

export const checkUser = createAsyncThunk<IUser, undefined, { rejectValue: string }>(
	'user/checkUser',
	async function (_, { rejectWithValue }) {
		const response = await fetchWrapper('api/user/auth', {
			method: 'GET',
		})

		const _data = await response.json()

		if (_data.token) {
			localStorage.setItem('token', _data.token)
		}

		if (!response.ok) {
			return rejectWithValue('Role check failed. Server error.')
		}

		return await jwtDecode(_data.token)
	},
)

export const addPageOnServer = createAsyncThunk<
	{ id: number; pageInfo: string; createdAt: string }[],
	{ userId: number; currentElements: IElement['subject']['html'][] },
	{ rejectValue: string }
>('user/savePageOnServer', async function (data, { rejectWithValue }) {
	const response = await fetchWrapper('api/user/savedPages', {
		method: 'POST',
		body: JSON.stringify({ ...data }),
	})

	const _data = await response.json()

	if (!response.ok) {
		return rejectWithValue(_data.message)
	}

	return _data
})

export const fetchPagesFromServer = createAsyncThunk<
	{ id: number; pageInfo: string; createdAt: string }[],
	number,
	{ rejectValue: string }
>('user/fetchPagesFromServer', async function (userId, { rejectWithValue }) {
	const response = await fetchWrapper(`api/user/savedPages/${userId}`, {
		method: 'GET',
	})

	const _data = await response.json()

	if (!response.ok) {
		return rejectWithValue(_data.message)
	}

	return _data
})

export const updatePageOnServer = createAsyncThunk<
	{ id: number; pageInfo: string; createdAt: string },
	{ userPageId: number; currentElements: IElement['subject']['html'][] },
	{ rejectValue: string }
>('user/updatePageOnServer', async function (data, { rejectWithValue }) {
	const response = await fetchWrapper('api/user/savedPages', {
		method: 'PUT',
		body: JSON.stringify({ ...data }),
	})

	const _data = await response.json()

	if (!response.ok) {
		return rejectWithValue(_data.message)
	}

	return _data
})

export const deletePageFromServer = createAsyncThunk<
	{ id: number; pageInfo: string; createdAt: string },
	number,
	{ rejectValue: string }
>('user/deletePageFromServer', async function (id, { rejectWithValue }) {
	const response = await fetchWrapper(`api/user/savedPages/${id}`, {
		method: 'DELETE',
	})

	const _data = await response.json()

	if (!response.ok) {
		return rejectWithValue(_data.message)
	}

	return _data
})

const userSlice = createSlice({
	name: 'user',
	initialState: userState,
	reducers: {
		logout(state) {
			state.user = {} as IUser
			state.isAuth = false
		},
		setUserPageId(state, action: PayloadAction<number>) {
			state.userPageId = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registration.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(addPageOnServer.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updatePageOnServer.pending, (state) => {
				state.isLoading = true
			})
			.addCase(registration.fulfilled, (state, action: PayloadAction<IUser>) => {
				state.user = action.payload
				state.isAuth = true
				state.isLoginError = undefined
				state.isSignUpError = undefined
				state.isLoading = false
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
				state.user = action.payload
				state.isAuth = true
				state.isLoginError = undefined
				state.isSignUpError = undefined
				state.isLoading = false
			})
			.addCase(checkUser.fulfilled, (state, action: PayloadAction<IUser>) => {
				state.user = action.payload
				state.isAuth = true
				state.isLoginError = undefined
				state.isSignUpError = undefined
			})
			.addCase(addPageOnServer.fulfilled, (state) => {
				state.isLoading = false
			})
			.addCase(fetchPagesFromServer.fulfilled, (state, action) => {
				state.userPages = action.payload
			})
			.addCase(updatePageOnServer.fulfilled, (state) => {
				state.isLoading = false
			})
			.addCase(deletePageFromServer.fulfilled, (state, action) => {
				state.userPages = state.userPages.filter((page) => page.id !== action.meta.arg)
			})
			.addCase(registration.rejected, (state, action: PayloadAction<string | undefined>) => {
				state.isAuth = false
				state.isSignUpError = action.payload
				state.isLoginError = undefined
				state.isLoading = false
			})
			.addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
				state.isAuth = false
				state.isLoginError = action.payload
				state.isSignUpError = undefined
				state.isLoading = false
			})
	},
})

export const { logout, setUserPageId } = userSlice.actions

export default userSlice.reducer
