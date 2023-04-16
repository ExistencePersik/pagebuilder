import { Button, ButtonGroup } from '@chakra-ui/react'
import { GoBeaker, GoCloudDownload, GoGear, GoHome, GoPackage, GoPlus, GoSignIn, GoSignOut } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { logout } from '../../redux/userSlice'
import './Navbar.css'

const Navbar = () => {
  const dispatch = useAppDispatch()

  const isAuth = useAppSelector(state => state.user.isAuth)
  const isAdmin = useAppSelector(state => state.user.user.role)
  const ADMIN = 'ADMIN'

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <ButtonGroup className='Navbar' display='flex' justifyContent='space-between'>
        <Button leftIcon={<GoHome />} as={Link} to={'/'} fontWeight='bold' colorScheme='messenger'>Pagebuilder</Button>
        <ButtonGroup spacing='5'>

          {isAdmin === ADMIN ? <Button leftIcon={<GoGear />} as={Link} to={'/create_element'} colorScheme='green'>Create new element</Button> : null}

          <Button rightIcon={<GoBeaker />} as={Link} to={'/app'}>Workspace</Button>

          {isAuth ?
            <ButtonGroup variant='solid'>
              <Button rightIcon={<GoPackage />}>Save</Button>
              <Button rightIcon={<GoCloudDownload />}>Download</Button>
              <Button rightIcon={<GoSignOut />} onClick={logoutHandler}>Log out</Button>
            </ButtonGroup>
            :
            <ButtonGroup variant='solid'>
              <Button as={Link} to={'/signup'} rightIcon={<GoPlus />}>Sign Up</Button>
              <Button as={Link} to={'/login'} rightIcon={<GoSignIn />}>Login</Button>
            </ButtonGroup>
          }

        </ButtonGroup>
      </ButtonGroup>
    </>
  )
}

export default Navbar
