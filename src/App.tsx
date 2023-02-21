import { Box } from '@chakra-ui/react'
import Elements from './components/Elements/Elements'
import Workspace from './components/Workspace/Workspace'

function App() {
  return (
    <Box display="flex">
      <Elements />
      <Workspace />
    </Box>
  )
}

export default App
