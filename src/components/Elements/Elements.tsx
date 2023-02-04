import { Box, Button, Heading, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks'
import { setCurrentElem } from '../../redux/elemsSlice'

const Elements = () => {
  const dispatch = useAppDispatch()
  const elements: {[index: string]: any} = useAppSelector(state => state.elements.Elements)

  const queryElementCategory = (e: any, category: string) => {
    let nameOfElement

    if (e.target.src) {
      nameOfElement = e.target.parentNode.parentNode.innerText
    } else {
      nameOfElement = e.target.innerText
    }

    const element = elements[category][`${nameOfElement}`]
    const pattern = Object.keys(element.images)
    let regExp
    let result: any

    pattern.forEach(item => {
      regExp = new RegExp(item, 'g')
      if (!result) {
        result = element.html.replace(regExp, `${element.images[item]}`)
      } else {
        result = result.replace(regExp, `${element.images[item]}`)
      }
    })

    dispatch(setCurrentElem(result))
  }

  const listOfElements = Object.keys(elements).map((category, index) => {
    return (
      <Box key={index}>
        <Menu>
          <MenuButton
            as={Button}
            _hover={{backgroundColor: "#60a5fa"}}
            rightIcon={<ChevronDownIcon />}
            w="7em"
            fontWeight="bold"
            fontSize="1.1em"
            >
              {category}
          </MenuButton>
          <MenuList>
            {Object.keys(elements[category]).map((item, i) => {
              return <MenuItem key={i} onClick={(e) => queryElementCategory(e, category)}>
                <Text>
                  {item}
                </Text>
                <Box ml="3">
                  <Image src={elements[category][item].cover} alt='Cover image' />
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
      <Heading as='h1' size='lg' p="1.5" noOfLines={1} color="white" backgroundColor="#2563eb" borderRadius="5px">Elements</Heading>
      {listOfElements}
    </Box>
  )
}

export default Elements
