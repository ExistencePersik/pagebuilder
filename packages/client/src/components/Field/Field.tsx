import { MouseEvent, useRef, useState } from 'react'
import {
	Box,
	Button,
	ButtonGroup,
	FormControl,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from '@chakra-ui/react'
import { ArrowDownIcon, ArrowUpIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { updateCurrentElement, setEditElement, addImage } from '../../redux/elemsSlice'
import './Field.css'
import '../../css/_style.css'

const Field = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { isOpen: isOpenImg, onOpen: onOpenImg, onClose: onCloseImg } = useDisclosure()
	const finalRef = useRef(null)

	type Data = {
		img: Blob[]
	}

	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid },
	} = useForm<Data>()

	const ref = useRef<HTMLDivElement>(null)
	const dispatch = useAppDispatch()
	const currentElements = useAppSelector((state) => state.elements.current)

	const [editingElementIndex, setEditingElementIndex] = useState(0)
	const [imageTitle, setImageTitle] = useState('')

	const editingHTML = useAppSelector((state) => state.elements.editing)
	const getHTML = (element: string) => {
		return { __html: element }
	}

	const removeElem = (index: number) => {
		const elementsArray = [...currentElements]
		elementsArray.splice(index, 1)

		dispatch(updateCurrentElement(elementsArray))
	}

	const editElem = (index: number) => {
		const elementsArray = [...currentElements]
		const editingElement = elementsArray.splice(index, 1)

		dispatch(setEditElement(editingElement))
		onOpen()
		setEditingElementIndex(index)
	}

	const editHandler = async (e: MouseEvent) => {
		e.preventDefault()
		const clickedItem = e.target as HTMLElement
		clickedItem.setAttribute('contenteditable', 'true')

		if (clickedItem.tagName === 'IMG') {
			setImageTitle(clickedItem.outerHTML)
			onOpenImg()
		}
	}

	const saveEditHandler = () => {
		const elementsArray = [...currentElements]

		const result = ref.current?.innerHTML.replace(/ contenteditable="true"/g, '')

		elementsArray[editingElementIndex] = result

		dispatch(updateCurrentElement(elementsArray))
		onClose()
	}

	const moveUp = (index: number) => {
		const elementsArray = [...currentElements]

		if (index !== 0) {
			const curItem = elementsArray[index]
			const prevItem = elementsArray[index - 1]

			elementsArray[index] = prevItem
			elementsArray[index - 1] = curItem

			dispatch(updateCurrentElement(elementsArray))
		}
	}

	const moveDown = (index: number) => {
		const elementsArray = [...currentElements]

		if (index !== elementsArray.length - 1) {
			const curItem = elementsArray[index]
			const nextItem = elementsArray[index + 1]

			elementsArray[index] = nextItem
			elementsArray[index + 1] = curItem

			dispatch(updateCurrentElement(elementsArray))
		}
	}

	const onAddImage = async (data: Data) => {
		const formData = new FormData()
		formData.append('file', data.img[0])
		const imgData = await dispatch(addImage(formData))

		if (imgData) {
			const addedImageURL = `${process.env.REACT_APP_API_URL}${imgData.payload}`
			const elementsArray = [...currentElements]
			const editingElement = elementsArray.splice(editingElementIndex, 1)

			const regExpStr = imageTitle.replace(/ contenteditable="true"/g, '')
			const regExp = new RegExp(regExpStr, '')
			const result = editingElement[0].replace(regExp, `<img src="${addedImageURL}" alt="img">`)
			dispatch(setEditElement([result]))
		}
		reset()
		onCloseImg()
	}

	const addedElements = currentElements.map((element: string, index: number) => {
		return (
			<Box key={index}>
				<ButtonGroup display='flex' justifyContent='flex-end' pr='5px' pt='5px' spacing='1.5'>
					<IconButton
						aria-label='Delete'
						icon={<DeleteIcon />}
						color='white'
						colorScheme='red'
						onClick={() => removeElem(index)}
					/>
					<IconButton
						aria-label='Edit'
						icon={<EditIcon />}
						color='white'
						colorScheme='green'
						onClick={() => editElem(index)}
					/>
					<ButtonGroup isAttached variant='outline'>
						<IconButton aria-label='Move up' icon={<ArrowUpIcon />} onClick={() => moveUp(index)} />
						<IconButton aria-label='Move down' icon={<ArrowDownIcon />} onClick={() => moveDown(index)} />
					</ButtonGroup>
				</ButtonGroup>

				<Box dangerouslySetInnerHTML={getHTML(element)}></Box>
			</Box>
		)
	})

	return (
		<Box className='Field'>
			{addedElements}
			{currentElements.length === 0 ? (
				<Text
					color='#979797'
					fontSize='xl'
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='relative'
					top='50%'
				>
					Your Field is empty!
				</Text>
			) : null}
			<Modal
				id='Field'
				finalFocusRef={finalRef}
				size='full'
				motionPreset='scale'
				scrollBehavior='inside'
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit your element</ModalHeader>
					<ModalCloseButton />
					<ModalBody p='0'>
						<Box onClick={(e) => editHandler(e)} ref={ref} dangerouslySetInnerHTML={getHTML(editingHTML[0])}></Box>
					</ModalBody>
					<ModalFooter>
						<Button onClick={saveEditHandler} mr={3} colorScheme='green'>
							Save Changes
						</Button>
						<Button onClick={onClose} variant='ghost'>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Modal size='sm' motionPreset='scale' isOpen={isOpenImg} onClose={onCloseImg} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<ModalCloseButton />
					</ModalHeader>
					<FormControl as='form' onSubmit={handleSubmit(onAddImage)}>
						<ModalBody px='0'>
							<Input
								py='1'
								variant='filled'
								type='file'
								accept='image/*,.png,.jpg,.gif,.web'
								{...register('img', { required: true })}
							/>
						</ModalBody>
						<ModalFooter>
							<Button mr={3} colorScheme='green' type='submit' isDisabled={!isValid}>
								Save Image
							</Button>
						</ModalFooter>
					</FormControl>
				</ModalContent>
			</Modal>
		</Box>
	)
}

export default Field
