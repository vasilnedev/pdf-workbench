import { useState } from 'react'
import { Grid, GridItem, Button, Textarea, HStack, VStack } from '@chakra-ui/react'
import PdfDocument from './PdfDocument'
import { TxtDocument } from './TxtDocuments'
import Pdf2TxtMenu from './Pdf2TxtMenu'

export default function Pdf2TxtTab( { pdfFileName, setPdfFileName , plainText, setPlainText }: 
{ 
  pdfFileName: string, 
  setPdfFileName: (text: string) => void, 
  plainText: string, 
  setPlainText: (text: string) => void 
}){

  const [ renderPdf, setRenderPdf ] = useState<boolean>(false)
  const [ plainTextFromPdf, setPlainTextFromPdf ] = useState<string>('')
  const [ searchText, setSearchText ] = useState<string>('')
  const [ replaceText, setReplaceText ] = useState<string>('')

  const handleReplaceAll = () => {
    if( searchText.length === 0 ) return
    const regex = new RegExp( searchText, 'g' )
    const newPlainText = plainText.replace( regex, replaceText )
    setPlainText( newPlainText )
  }

  return (
    <Grid
      templateRows="42px 134px 1fr"
      templateColumns="1fr 1fr"
      gap={2}
      padding={0}
      margin={0}
      height={'calc(100vh - 60px)'}
    >
      <GridItem colSpan={2} padding={1} backgroundColor="gray.700">
        <Pdf2TxtMenu
          pdfFileName={ pdfFileName } 
          setPdfFileName={ setPdfFileName }
          renderPdf={ renderPdf }
          setRenderPdf={ setRenderPdf } 
          plainTextFromPdf={ plainTextFromPdf }
          setPlainText={ setPlainText } 
        />
      </GridItem>
      <GridItem rowSpan={2} padding={0} backgroundColor="gray.700" overflow={'auto'}>
        <PdfDocument 
          pdfFileName={ pdfFileName } 
          renderPdf={ renderPdf }
          setPlainTextFromPdf={ setPlainTextFromPdf }
        />
      </GridItem>
      <GridItem padding={0} backgroundColor="gray.700">
        <HStack padding={1} width={'100%'}>
          <VStack width={'100%'}>
            <Textarea placeholder="Find text" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
            <Textarea placeholder="Replace text" value={replaceText} onChange={(e) => setReplaceText(e.target.value)}/>
          </VStack>
          <VStack>
            <Button onClick={handleReplaceAll}>Replace<br />All</Button>
          </VStack>
        </HStack>
      </GridItem>
      <GridItem padding={0} backgroundColor="gray.700" overflow={'auto'}>
        <TxtDocument 
          plainText={ plainText } 
          setPlainText={ setPlainText } 
        />
      </GridItem>
    </Grid>
  )
}