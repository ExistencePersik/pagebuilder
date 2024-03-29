import { Box, Button, ButtonGroup, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import './Homepage.css'

const Homepage = () => {
	const isAuth = useAppSelector((state) => state.user.isAuth)

	return (
		<Box className='Homepage'>
			<Text as='h1' fontSize='5xl' fontWeight='bold'>
				Welcome to{' '}
				<Text as='span' color='messenger.500' fontWeight='extrabold'>
					Pagebuilder
				</Text>
			</Text>
			<Text fontSize='3xl' mt='3'>
				Create your adaptive landing page.
			</Text>
			<Text fontSize='2xl'>Easily. Quickly. No code.</Text>

			<ButtonGroup mt='6'>
				{!isAuth ? (
					<>
						<Button width='140px' as={Link} to={'/signup'} fontSize='xl' colorScheme='messenger' variant='outline'>
							Sign Up
						</Button>
						<Button width='140px' as={Link} to={'/login'} fontSize='xl' variant='outline'>
							Login
						</Button>
					</>
				) : (
					<Button width='140px' as={Link} to={'/app'} fontSize='xl' colorScheme='messenger' variant='outline'>
						To Workspace
					</Button>
				)}
			</ButtonGroup>

			<Image mt='6' src='./img/Design_2.png' alt='Enthusiastic workers' width='480px'></Image>
		</Box>
	)
}

export default Homepage
