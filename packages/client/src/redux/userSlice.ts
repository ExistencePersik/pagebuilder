import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FieldValues } from 'react-hook-form'
import jwtDecode from 'jwt-decode'
import { IUser, IUserState } from '../models/models'

const userState: IUserState = {
  user: {} as IUser,
  isAuth: false,
  isLoginError: undefined,
  isSignUpError: undefined,
  isLoading: false
}

export const registration = createAsyncThunk<IUser, FieldValues, { rejectValue: string }>(
  'user/registration',
  async function (data, { rejectWithValue }) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...data, role: 'USER'})
      })

      const _data = await response.json()

      if (_data.token) {
        localStorage.setItem('token', _data.token)
      }

      if (!response.ok) {
        return rejectWithValue(_data.message)
      }
      return (await jwtDecode(_data.token))
  }
)

export const login = createAsyncThunk<IUser, FieldValues, { rejectValue: string }>(
  'user/login',
  async function (data, { rejectWithValue }) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...data})
      })

      const _data = await response.json()

      if (_data.token) {
        localStorage.setItem('token', _data.token)
      }

      if (!response.ok) {
        return rejectWithValue(_data.message)
      }

      return (await jwtDecode(_data.token))
  }
)

export const checkUser = createAsyncThunk<IUser, undefined, { rejectValue: string }>(
  'user/checkUser',
  async function (_, { rejectWithValue }) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/user/auth`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

      const _data = await response.json()

      if (_data.token) {
        localStorage.setItem('token', _data.token)
      }

      if (!response.ok) {
        return rejectWithValue('Role check failed. Server error.')
      }

      return (await jwtDecode(_data.token))
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    logout(state) {
      state.user = {} as IUser
      state.isAuth = false
      localStorage.setItem('token', '')
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
  }
})

export const { logout } = userSlice.actions

export default userSlice.reducer
