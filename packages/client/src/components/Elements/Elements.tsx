import { MouseEvent, useEffect } from 'react'
import { Box, Button, Heading, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setCurrentElement, fetchElements } from '../../redux/elemsSlice'
import { IElement } from '../../models/models'
import './Elements.css'

const Elements = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchElements())
  }, [dispatch])

  const elements: {[index: string]: IElement[]} = useAppSelector(state => state.elements.elements)

  const queryElementCategory = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, category: string, index: number) => {
    const element = elements[category][index]

    const pattern = Object.keys(element['subject']['images'])
    let regExp
    let result: string = ''

    if(pattern.length === 0) {
      result = element.subject.html
    }

    pattern.forEach(item => {
      regExp = new RegExp(item, 'g')
      if (!result) {
        result = element.subject.html.replace(regExp, `${element.subject.images[item]}`)
      } else {
        result = result.replace(regExp, `${element.subject.images[item]}`)
      }
    })

    dispatch(setCurrentElement(result))
  }

  const listOfElements = Object.keys(elements).map((category: string, index: number) => {
    return (
      <Box key={index}>
        <Menu>
          <MenuButton
            as={Button}
            _hover={{backgroundColor: '#7ab8ff', transform: 'scale(1.03)', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}
            rightIcon={<ChevronDownIcon />}
            w='7em'
            fontWeight='bold'
            fontSize='1.1em'
            >
              {category}
          </MenuButton>
          <MenuList>
            {Object.keys(elements[category]).map((_, i: number) => {
              return <MenuItem
                borderRadius='5'
                _focus={{backgroundColor: '#e5e7eb', transform: 'scale(0.97)', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}
                _hover={{backgroundColor: '#e5e7eb', transform: 'scale(0.97)', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}
                key={i}
                onClick={(e) => queryElementCategory(e, category, i)}>
                <Text>
                  {elements[category][i].name}
                </Text>
                <Box ml='3'>
                  <Image src={elements[category][i]['subject']['cover']} alt='Cover image' />
                </Box>
              </MenuItem>
            })}
          </MenuList>
        </Menu>
      </Box>
    )
  })

  return (
    <Box className='elementsContainer'>
      <Heading as='h1' size='lg' p='1.5' noOfLines={1} color='white' backgroundColor='messenger.500' borderRadius='5px' cursor='default'>Elements</Heading>
      {listOfElements}
    </Box>
  )
}

export default Elements
