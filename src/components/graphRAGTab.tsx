import { useState } from 'react'
import { Container, VStack, Textarea, Button, Text } from '@chakra-ui/react'
import { queryGraph } from './graphData'

export default function GraphRAGTab() {
  const [ queryText, setQueryText ] = useState<string>('')
  const [ response, setResponse ] = useState<string>(
`
This is a placeholder for the Graph RAG functionality.
You can enter your query in the text area above and click "Send Query" to process it.
`
  )

  const handleSendQuery = () => {
    if ( !queryText.trim() ) {
      setResponse( 'Please enter a query.' )
      return
    }
    setResponse( 'Awaiting response ...' )
    queryGraph( queryText )
      .then( ( res ) => {
        setResponse( res )
      } )
      .catch( ( error ) => {
        setResponse( `Error processing query: ${error.message}` )
      } )
  }
  
  return (
    <Container 
      maxW="container.md" 
      padding={0} 
      height={'calc(100vh - 60px)'}
      display="flex" 
      flexDirection="column"
    >
      <VStack 
        width={'100%'}
        gap={4}
      >
      <Textarea 
        placeholder="Query text"
        size="md"
        height="100px"
        value={queryText} 
        onChange={(e) => setQueryText(e.target.value)}
      />
      <Button variant='outline' onClick={ handleSendQuery }>Send Query</Button>
      <Text>
        { response }
      </Text>
      </VStack>
    </Container>
  )  
}