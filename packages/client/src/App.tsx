import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppDispatch } from './hooks/reduxHooks'
import { checkUser } from './redux/userSlice'
import RegForm from './components/Forms/RegForm'
import LoginForm from './components/Forms/LoginForm'
import Workspace from './components/Workspace/Workspace'
import Homepage from './components/Homepage/Homepage'
import Navbar from './components/Navbar/Navbar'
import CreateElementPage from './components/CreateElementPage/CreateElementPage'
import UserPages from './components/UserPages/UserPages'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkUser())
		}
	}, [dispatch])

	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/app' element={<Workspace />} />
				<Route path='/pages' element={<UserPages />} />
				<Route path='/create_element' element={<CreateElementPage />} />
				<Route path='/signup' element={<RegForm />} />
				<Route path='/login' element={<LoginForm />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
