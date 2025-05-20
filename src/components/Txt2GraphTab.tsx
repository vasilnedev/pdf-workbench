import { Grid, GridItem } from '@chakra-ui/react'
import { TxtDocument , JSONDocument } from './TxtDocuments'
import Txt2GraphMenu from './Txt2GraphMenu'

export default function Txt2GraphTab( { pdfFileName, plainText, setPlainText , graphJSON, setGraphJSON }: 
  {  
    pdfFileName: string,
    plainText: string, 
    setPlainText: (text: string) => void 
    graphJSON: string,
    setGraphJSON: (json: string) => void
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
      <GridItem colSpan={2} padding={1} backgroundColor="gray.700">
        <Txt2GraphMenu
          pdfFileName={ pdfFileName }
          plainText={ plainText }
          setPlainText={ setPlainText }
          graphJSON={ graphJSON }
          setGraphJSON={ setGraphJSON }
        />
      </GridItem>
      <GridItem padding={0} backgroundColor="gray.700" overflow={'auto'}>
        <TxtDocument plainText={ plainText } setPlainText={ setPlainText } />
      </GridItem>
      <GridItem padding={0} backgroundColor="gray.700" overflow={'auto'}>
        <JSONDocument graphJSON={ graphJSON } setGraphJSON={ setGraphJSON } />
      </GridItem>
    </Grid>
  )
}
