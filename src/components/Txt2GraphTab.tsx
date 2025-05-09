import { Grid, GridItem } from '@chakra-ui/react'
import TxtDocument from './TxtDocument'

export default function Txt2GraphTab( { plainText, setPlainText }: 
  {  
    plainText: string, 
    setPlainText: (text: string) => void 
  }){

  return (
    <Grid
    templateRows="42px 1fr"
    templateColumns="1fr 1fr"
    gap={2}
    padding={0}
    margin={0}
    height={'calc(100vh - 60px)'}
    >
      <GridItem colSpan={2} padding={2} backgroundColor="gray.700">
        <p>Menu bar</p>
      </GridItem>
      <GridItem padding={0} backgroundColor="gray.700" overflow={'auto'}>
        <TxtDocument plainText={ plainText } setPlainText={ setPlainText } />
      </GridItem>
      <GridItem padding={4} backgroundColor="gray.700" overflow={'auto'}>
        <p>Graph Viewer</p>
      </GridItem>
    </Grid>
  )
}