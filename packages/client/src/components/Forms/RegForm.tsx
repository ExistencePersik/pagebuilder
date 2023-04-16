import { FormControl, FormLabel, FormHelperText, Input, Button, Text, Box, } from '@chakra-ui/react'
import { FieldValues, useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { registration } from '../../redux/userSlice'
import './Form.css'

const RegForm = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm()

  const regSubmit = async (data: FieldValues) => {
    dispatch(registration(data))
  }

  const isAuth = useAppSelector(state => state.user.isAuth)
  const isError = useAppSelector(state => state.user.isSignUpError)
  const isLoading = useAppSelector(state => state.user.isLoading)

  return (
    <>
      {isAuth && <Navigate replace to='/app' />}
      <Box as='form' className='Form' onSubmit={handleSubmit(regSubmit)}>
        <Text as='h2' fontSize='3xl'>Sign up</Text>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='email' placeholder='example@example.com' {...register('email', { required: true })} />
        </FormControl>
        <FormControl mt='1'>
          <FormLabel>Password</FormLabel>
          <Input type='password' {...register('password', { required: true, maxLength: 16,  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })} />
          <FormHelperText textAlign='center'>Minimum eight characters, at least one letter and one number.</FormHelperText>
          {isError && <FormHelperText color='red' textAlign='center'>{isError}</FormHelperText>}
        </FormControl>
        <Button mt='1' isLoading={isLoading} type='submit' isDisabled={!isValid}>
          Submit
        </Button>
      </Box>
    </>
  )
}

export default RegForm
