import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { elementsState } from './elemsState'

export interface IElement  {
  name: string
  cover: string
  images: {
    [key: string]: string
  }
  html: string
}

export interface IElementsState {
  Elements: {[key: string]: {[key: string]: IElement} };
  current: IElement["html"][];
  editing: IElement["html"][];
}


const elementsSlice = createSlice({
  name: 'elements',
  initialState: elementsState,
  reducers: {
    setCurrentElem(state, action: PayloadAction<IElement["html"]>) {
      state.current.push(
        action.payload
      )
    },
    updateCurrentElem(state, action: PayloadAction<IElement["html"][]>) {
      state.current = action.payload
    },
    setEditElem(state, action: PayloadAction<IElement["html"][]>) {
      state.editing = action.payload
    }
  },
})

export const { setCurrentElem, updateCurrentElem, setEditElem } = elementsSlice.actions

export default elementsSlice.reducer
