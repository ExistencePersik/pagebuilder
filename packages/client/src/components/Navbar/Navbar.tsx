import { useState } from 'react'
import {
	Button,
	ButtonGroup,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react'
import {
	GoBeaker,
	GoCloudDownload,
	GoGear,
	GoHome,
	GoListUnordered,
	GoPackage,
	GoPerson,
	GoPlus,
	GoSignIn,
	GoSignOut,
} from 'react-icons/go'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { addPageOnServer, logout, updatePageOnServer } from '../../redux/userSlice'
import { downloadHTML, sendHTML } from '../../redux/elemsSlice'
import './Navbar.css'

const Navbar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const dispatch = useAppDispatch()

	const currentElements = useAppSelector((state) => state.elements.current)
	const userPageId = useAppSelector((state) => state.user.userPageId)
	const isAuth = useAppSelector((state) => state.user.isAuth)
	const isDownload = useAppSelector((state) => state.elements.isLoading)
	const isLoading = useAppSelector((state) => state.user.isLoading)
	const userInfo = useAppSelector((state) => state.user.user)
	const ADMIN = 'ADMIN'

	const [pageTitle, setPageTitle] = useState('')

	const logoutHandler = () => {
		dispatch(logout())
	}

	const downloadPage = async () => {
		if (currentElements.length !== 0 && pageTitle.length >= 1) {
			const response = await dispatch(sendHTML({ currentElements, pageTitle }))
			if (response.payload !== 'No elements.') {
				const fileName = response.payload as string
				const data = await dispatch(downloadHTML(fileName))
				const fileReader = new FileReader()
				fileReader.readAsDataURL(new Blob([data.payload as BlobPart]))
				fileReader.addEventListener('loadend', () => {
					const blobString = fileReader.result as string
					const link = document.createElement('a')
					link.href = blobString
					link.setAttribute('download', 'index.html')
					document.body.appendChild(link)
					link.click()
					link.remove()
				})
				onClose()
			}
		}
	}

	const saveToUserPages = () => {
		if (currentElements.length !== 0) {
			if (userPageId !== 0) {
				dispatch(updatePageOnServer({ userPageId, currentElements }))
			} else {
				const userId = userInfo.id as number
				dispatch(addPageOnServer({ userId, currentElements }))
			}
		}
	}

	return (
		<>
			<ButtonGroup className='Navbar' display='flex' justifyContent='space-between'>
				<ButtonGroup spacing='5'>
					<Button leftIcon={<GoHome />} as={Link} to={'/'} fontWeight='bold' colorScheme='messenger'>
						Pagebuilder
					</Button>

					{isAuth ? (
						<ButtonGroup variant='solid'>
							<Button leftIcon={<GoBeaker />} as={Link} to={'/app'}>
								Workspace
							</Button>
							{isLoading ? (
								<Button
									as={Link}
									to={'/pages'}
									leftIcon={<GoListUnordered />}
									colorScheme='messenger'
									transition='all 0.3s ease-in'
								>
									My Pages
								</Button>
							) : (
								<Button as={Link} to={'/pages'} leftIcon={<GoListUnordered />} transition='all 0.3s ease-out'>
									My Pages
								</Button>
							)}
						</ButtonGroup>
					) : null}
				</ButtonGroup>

				<ButtonGroup spacing='5'>
					{userInfo.role === ADMIN ? (
						<Button leftIcon={<GoGear />} as={Link} to={'/create_element'} colorScheme='green'>
							Create new element
						</Button>
					) : null}

					{isAuth ? (
						<>
							<ButtonGroup variant='solid'>
								<Button as='div' leftIcon={<GoPerson />} variant='outline' colorScheme='black'>
									{userInfo.email}
								</Button>
								<Button
									isLoading={isLoading}
									onClick={saveToUserPages}
									isDisabled={currentElements.length === 0}
									rightIcon={<GoPackage />}
								>
									Save to My Pages
								</Button>
								<Button onClick={onOpen} isDisabled={currentElements.length === 0} rightIcon={<GoCloudDownload />}>
									Download
								</Button>
								<Button rightIcon={<GoSignOut />} onClick={logoutHandler}>
									Log out
								</Button>
							</ButtonGroup>
						</>
					) : (
						<ButtonGroup variant='solid'>
							<Button as={Link} to={'/signup'} rightIcon={<GoPlus />}>
								Sign Up
							</Button>
							<Button as={Link} to={'/login'} rightIcon={<GoSignIn />}>
								Login
							</Button>
						</ButtonGroup>
					)}
				</ButtonGroup>
			</ButtonGroup>

			<Modal size='sm' motionPreset='scale' isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						Set title for your webpage
						<ModalCloseButton />
					</ModalHeader>
					<ModalBody mx='3' px='0'>
						<Input
							autoComplete='off'
							onChange={(e) => {
								setPageTitle(e.target.value)
							}}
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							isLoading={isDownload}
							onClick={downloadPage}
							isDisabled={pageTitle.length < 1}
							rightIcon={<GoCloudDownload />}
						>
							Download
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default Navbar
