import { useRef, useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, Select, Textarea } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { createElement } from '../../redux/elemsSlice'
import { FormValues } from '../../models/models'

const CreateElementPage = () => {
  const dispatch = useAppDispatch()
  const selectedElement = useRef<any>()
  const [inputsStack, setInputsStack] = useState<any[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormValues>()

  const onSubmit = (formData: FormValues) => {
    const type = selectedElement.current.value
    const images: {[key: string]: string} = {}

    inputsStack.forEach(item => {
      images[item.key] = item.value
    })

    const data = {subject: {...formData, images: images}, name: formData.name}

    dispatch(createElement({data, type}))
    reset()
  }

  const addToInputsStack = () => {
    setInputsStack([...inputsStack, { id: inputsStack.length, value: '', key: ''}])
  }
  const changeKey = (id: number, key: string) => {
    setInputsStack(
      inputsStack.map((input, index) => {
        return index === id ? { ...input, key: key } : input
      })
    )
  }
  const changeValue = (id: number, value: string) => {
    setInputsStack(
      inputsStack.map((input, index) => {
        return index === id ? { ...input, value: value } : input
      })
    )
  }

  return(
    <Box p='30px' as='form' onSubmit={handleSubmit(onSubmit)}>
      <FormControl mt='2'>
        <FormLabel mr='0'>type of element:</FormLabel>
        <Select ref={selectedElement} placeholder='-' width='25%'>
          <option value='headers'>Headers</option>
          <option value='content'>Content</option>
          <option value='footers'>Footers</option>
        </Select>
      </FormControl>


      <FormControl mt='2'>
        <FormLabel mr='0'>name:</FormLabel>
        <Input {...register('name', { required: true, maxLength: 20 })} autoComplete='off' width='25%' />
      </FormControl>

      <FormControl mt='2'>
        <FormLabel mr='0'>cover: (URL)</FormLabel>
        <Input {...register('cover', { required: true })} autoComplete='off' width='25%' />
      </FormControl>


      <FormControl mt='2'>
        <FormLabel mr='0'>images:</FormLabel>
        <Button onClick={addToInputsStack} width='25%'>
          Add more images
        </Button>
        {inputsStack.map((_, index: number) => (
          <FormControl key={index} display='flex'>
            <Input
              placeholder='key:'
              autoComplete='off'
              onChange={(e) => {
                changeKey(index, e.target.value)
              }}
              width='25%'
              mt='1'
              mr='1'
            />
            <Input
              placeholder='value: (URL)'
              autoComplete='off'
              onChange={(e) => {
                changeValue(index, e.target.value)
              }}
              width='25%'
              mt='1'
            />
          </FormControl>
        ))}
      </FormControl>

      <FormControl mt='2'>
        <FormLabel mr='0'>html:</FormLabel>
        <Textarea {...register('html', { required: true })} />
      </FormControl>

      <Button mt='2' type='submit' isDisabled={!isValid} colorScheme='green'>
        Add new element
      </Button>
    </Box>
  )
}

export default CreateElementPage
