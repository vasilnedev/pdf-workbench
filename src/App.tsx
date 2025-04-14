import { Theme, Box } from "@chakra-ui/react"

const App = () => {
  return (
    <Theme appearance="dark">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <h1>Hello, PDF Workbench!</h1>
      </Box>
    </Theme>
  )
}

export default App
