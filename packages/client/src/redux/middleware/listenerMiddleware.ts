import { createListenerMiddleware } from '@reduxjs/toolkit'
import { logout } from '../userSlice'

export const listenerMiddleware = createListenerMiddleware()
listenerMiddleware.startListening({
	actionCreator: logout,
	effect: () => localStorage.setItem('token', ''),
})
