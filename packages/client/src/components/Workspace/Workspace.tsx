import { Box } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import Elements from '../Elements/Elements'
import Field from '../Field/Field'

const Workspace = () => {
	const isAuth = useAppSelector((state) => state.user.isAuth)

	return (
		<>
			{!isAuth && <Navigate replace to='/login' />}
			<Box display='flex'>
				<Elements />
				<Field />
			</Box>
		</>
	)
}

export default Workspace
