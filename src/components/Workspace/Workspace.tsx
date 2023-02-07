import { MouseEvent, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks'
import { updateCurrentElem, setEditElem } from '../../redux/elemsSlice'
import { Box, Button, ButtonGroup, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { ArrowDownIcon, ArrowUpIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import '../../css/style.css'

const Workspace = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)

  const ref = useRef<HTMLDivElement>(null!)
  const dispatch = useAppDispatch()
  const editingElem = useAppSelector(state => state.elements.editing)
  const elements = useAppSelector(state => state.elements.current)

  const [editingElemIndex, setEditingElemIndex] = useState(0)

  const getHTML = (element: string) => {
    return {__html: element}
  }

  const removeElem = (index: number) => {
    const elementsArray = [...elements]
    elementsArray.splice(index, 1)

    dispatch(updateCurrentElem(elementsArray))
  }

  const editElem = (index: number) => {
    const elementsArray = [...elements]
    const editingElement = elementsArray.splice(index, 1)

    dispatch(setEditElem(editingElement))
    onOpen()
    setEditingElemIndex(index)
  }

  const editHandler = (e: MouseEvent) => {
    e.preventDefault()
    const clickedItem = e.target as HTMLElement
    clickedItem.setAttribute('contenteditable', 'true')
  }

  const saveEditHandler = () => {
    const elementsArray = [...elements]

    const txt = ref.current.innerHTML
    const result = txt.replace(/ contenteditable="true"/g, '')

    elementsArray[editingElemIndex] = result

    dispatch(updateCurrentElem(elementsArray))
    onClose()
  }

  const moveUp = (index: number) => {
    const elementsArray = [...elements]

    if (index !== 0) {
      const curItem = elementsArray[index]
      const prevItem = elementsArray[index - 1]

      elementsArray[index] = prevItem
      elementsArray[index - 1] = curItem

      dispatch(updateCurrentElem(elementsArray))
    }
  }

  const moveDown = (index: number) => {
    const elementsArray = [...elements]

    if (index !== elementsArray.length - 1) {
      const curItem = elementsArray[index]
      const nextItem = elementsArray[index + 1]

      elementsArray[index] = nextItem
      elementsArray[index + 1] = curItem

      dispatch(updateCurrentElem(elementsArray))
    }
  }

  const addedElems = elements.map((element, index) => {
    return (
      <Box key={index}>
        <ButtonGroup spacing="1.5">
          <IconButton aria-label="Delete" icon={<DeleteIcon />} color="white" colorScheme="red" onClick={() => removeElem(index)} />
          <IconButton aria-label="Edit" icon={<EditIcon />} color="white" colorScheme="green" onClick={() => editElem(index)} />
          <ButtonGroup isAttached variant="outline">
            <IconButton aria-label="Move up" icon={<ArrowUpIcon />} onClick={() => moveUp(index)} />
            <IconButton aria-label="Move down" icon={<ArrowDownIcon />} onClick={() => moveDown(index)} />
          </ButtonGroup>
        </ButtonGroup>

        <Box dangerouslySetInnerHTML={getHTML(element)}></Box>
      </Box>
    )
  })

  return (
    <Box className="Workspace">
      {addedElems}
      {
        elements.length === 0 ? <Text color="#979797" fontSize="xl" display="flex" flexDirection="column" alignItems="center" position="relative" top="50%">
          Your workspace is empty!
        </Text> : null
      }
      <Modal id='Workspace' finalFocusRef={finalRef} size="full" motionPreset="scale" scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your element</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="0">
            <Box
              onClick={(e) => editHandler(e)}
              ref={ref}
              dangerouslySetInnerHTML={getHTML(editingElem[0])}
            >
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={saveEditHandler} mr={3} colorScheme="green">
              Save Changes
            </Button>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Workspace
