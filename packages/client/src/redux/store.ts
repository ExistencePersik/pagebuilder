import { configureStore } from '@reduxjs/toolkit'
import elementsReducer from './elemsSlice'
import userReducer from './userSlice'
import { listenerMiddleware } from './middleware/listenerMiddleware'

const store = configureStore({
  reducer: {
    elements: elementsReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listenerMiddleware.middleware)
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
