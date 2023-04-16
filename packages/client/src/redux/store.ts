import { configureStore } from '@reduxjs/toolkit'
import elementsReducer from './elemsSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    elements: elementsReducer,
    user: userReducer
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
