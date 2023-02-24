import { configureStore } from '@reduxjs/toolkit'
import elementsReducer from './elemsSlice'

const store = configureStore({
  reducer: {
    elements: elementsReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
