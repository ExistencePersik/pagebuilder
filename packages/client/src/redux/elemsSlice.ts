import { createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { elementsState } from './elemsState'
import { IElement } from '../models/models'

export const fetchElements = createAsyncThunk<{[key: string]: IElement[]}, undefined, {rejectValue: string}>(
  'elements/fetchElements',
  async function (_, {rejectWithValue}) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/elements/all`)

    if (!response.ok) {
      return rejectWithValue('Server Error!')
    }

    const data = await response.json()
    return data
  }
)

export const createElement = createAsyncThunk<IElement, {data: IElement, type: string}, { rejectValue: string }>(
  'elements/createElements',
  async function ({data, type}, { rejectWithValue }) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/elements/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })

    const _data = await response.json()

    if (!response.ok) {
      return rejectWithValue(_data.message)
    }

    return (_data) as IElement
  }
)


const elementsSlice: Slice = createSlice({
  name: 'elements',
  initialState: elementsState,
  reducers: {
    setCurrentElem(state, action: PayloadAction<IElement['subject']['html']>) {
      state.current.push(
        action.payload
      )
    },
    updateCurrentElem(state, action: PayloadAction<IElement['subject']['html'][]>) {
      state.current = action.payload
    },
    setEditElem(state, action: PayloadAction<IElement['subject']['html'][]>) {
      state.editing = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createElement.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchElements.fulfilled, (state, action) => {
        state.Elements = action.payload
      })
      .addCase(createElement.fulfilled, (state) => {
        state.isLoading = false
      })
  }
})

export const { setCurrentElem, updateCurrentElem, setEditElem } = elementsSlice.actions

export default elementsSlice.reducer
