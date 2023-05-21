import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, SimpleGrid, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { fetchPagesFromServer, setUserPageId } from '../../redux/userSlice'
import { GoFileCode, GoPencil, GoPlus, GoX } from 'react-icons/go'
import { deletePageFromServer } from '../../redux/userSlice'
import { updateCurrentElement } from '../../redux/elemsSlice'

const UserPages = () => {
  const dispatch = useAppDispatch()
  const currentElements = useAppSelector(state => state.elements.current)
  const userInfo = useAppSelector(state => state.user.user)
  const myPages = useAppSelector(state => state.user.userPages)

  useEffect(() => {
    if (Number.isInteger(userInfo.id)) {
      dispatch(fetchPagesFromServer(userInfo.id))
    }
  }, [dispatch, userInfo])

  const setPageToCurrents = (index: number) => {
    dispatch(updateCurrentElement(myPages[index]['pageInfo']))
    dispatch(setUserPageId(myPages[index]['id']))
  }

  const onDeletePage = (index: number) => {
    const pageId = myPages[index]['id']

    dispatch(deletePageFromServer(pageId))
  }

  const onCreateNewPage = () => {
    const elementsArray = [...currentElements]
    elementsArray.splice(0, elementsArray.length)

    dispatch(updateCurrentElement(elementsArray))
    dispatch(setUserPageId(0))
  }

  const mySavedPages = Object.keys(myPages).map((item, index) => {
    return (
      <Card key={index} boxShadow='rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' justify='space-between' align='center'>
        <CardHeader fontSize='5xl'>
          {<GoFileCode />}
        </CardHeader>
        <CardBody textAlign='center' p='0'>
          <Text>{(new Date(myPages[index]['createdAt'].split('T').join(' ').split('.')[0])).toString().split(' (')[0]}</Text>
        </CardBody>
        <CardFooter as={ButtonGroup} spacing='5'>
          <Button onClick={() => onDeletePage(index)}>{<GoX />}</Button>
          <Button onClick={() => setPageToCurrents(index)} as={Link} to={'/app'}>{<GoPencil />}</Button>
        </CardFooter>
      </Card>
    )
  })

  return (
    <SimpleGrid spacing={4} mt='15px' ml='30px' mr='30px' templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
      {mySavedPages}

      <Card boxShadow='rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' justify='space-between' align='center'>
        <CardHeader fontSize='5xl'>
          {<GoPlus />}
        </CardHeader>
        <CardBody textAlign='center' p='0'>
          <Text>Try new ideas</Text>
          <Text>with Pagebuilder</Text>
        </CardBody>
        <CardFooter flex='false'>
          <Button onClick={onCreateNewPage} as={Link} to={'/app'}>
            Create new page
          </Button>
        </CardFooter>
      </Card>
    </SimpleGrid>
  )
}

export default UserPages
