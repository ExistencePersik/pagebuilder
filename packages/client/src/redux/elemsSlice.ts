import { createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { IElement, IElementsState } from '../models/models'
import { get, post } from '../services/fetchWrapper'

export const elementsState: IElementsState = {
  elements: {},
  current: [],
  editing: [],
  isLoading: false,
  addedImages: undefined
}

export const fetchElements = createAsyncThunk<{[key: string]: IElement[]}, undefined, {rejectValue: string}>(
  'elements/fetchElements',
  async function (_, {rejectWithValue}) {
    const response = await get(`api/elements/all`)

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
    const response = await post(`api/elements/${type}`, {
      body: JSON.stringify(data)
    })

    const _data = await response.json()

    if (!response.ok) {
      return rejectWithValue(_data.message)
    }

    return (_data) as IElement
  }
)

export const addImage = createAsyncThunk<IElementsState['addedImages'], FormData, { rejectValue: string }>(
  'elements/addImage',
  async function (data, { rejectWithValue }) {
    const response = await post(`api/images/image`, {
      body: data
    })

    const _data = await response.json()

    if (!response.ok) {
      return rejectWithValue('Server Error')
    }

    return (_data.imgName)
  }
)

export const sendHTML = createAsyncThunk<string, { currentElements: IElement['subject']['html'][]; pageTitle: string; }, { rejectValue: string }>(
  'elements/sendHTML',
  async function (data, { rejectWithValue }) {
    const response = await post(`api/files/file`, {
      body: JSON.stringify({...data})
    })

    const _data = await response.json()

    if (!response.ok) {
      return rejectWithValue(_data.message)
    }

    return (_data.fileName)
  }
)

export const downloadHTML = createAsyncThunk<BlobPart, string | undefined, { rejectValue: string }>(
  'elements/downloadHTML',
  async function (fileName, { rejectWithValue }) {
    const response = await get(`api/files/file/${fileName}`, {
      headers: {
        'Content-Type': 'text/html'
      }
    })

    if (!response.ok) {
      return rejectWithValue('Server Error!')
    }

    const data = await response.blob()

    return data
  }
)

const elementsSlice: Slice = createSlice({
  name: 'elements',
  initialState: elementsState,
  reducers: {
    setCurrentElement(state, action: PayloadAction<IElement['subject']['html']>) {
      state.current.push(
        action.payload
      )
    },
    updateCurrentElement(state, action: PayloadAction<IElement['subject']['html'][]>) {
      state.current = action.payload
    },
    setEditElement(state, action: PayloadAction<IElement['subject']['html'][]>) {
      state.editing = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createElement.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendHTML.pending, (state) => {
        state.isLoading = true
      })
      .addCase(downloadHTML.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchElements.fulfilled, (state, action) => {
        state.elements = action.payload
      })
      .addCase(createElement.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addImage.fulfilled, (state, action) => {
        state.addedImages = action.payload
      })
      .addCase(downloadHTML.fulfilled, (state) => {
        state.isLoading = false
      })
  }
})

export const { setCurrentElement, updateCurrentElement, setEditElement } = elementsSlice.actions

export default elementsSlice.reducer
