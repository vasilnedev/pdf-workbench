import { useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import PdfDocument from './PdfDocument'
import TxtDocument from './TxtDocument'
import Pdf2TxtMenu from './Pdf2TxtMenu'

export default function Pdf2TxtTab( { plainPdfText, setPlainPdfText, plainText, setPlainText }: 
{ 
  plainPdfText: string, 
  setPlainPdfText: (text: string) => void, 
  plainText: string, 
  setPlainText: (text: string) => void 
}){

  const [file , setFile ] = useState<string>('')

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
        <Pdf2TxtMenu
          setFile={ setFile }
          setPlainText={ setPlainText }
          plainPdfText={ plainPdfText }
        />
      </GridItem>
      <GridItem padding={0} backgroundColor="gray.700" overflow={'auto'}>
        <PdfDocument file={ file } setPlainPdfText={ setPlainPdfText } />
      </GridItem>
      <GridItem padding={4} backgroundColor="gray.700" overflow={'auto'}>
        <TxtDocument plainText={ plainText } setPlainText={ setPlainText } />
      </GridItem>
    </Grid>
  )
}