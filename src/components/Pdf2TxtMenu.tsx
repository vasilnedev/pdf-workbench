import { useEffect, useState } from 'react'
import { Button, HStack, Flex, CloseButton, Dialog, Portal, For } from '@chakra-ui/react'
import convert from 'xml-js'

const pdfFolder = '/pdf-documents/'

export default function Pdf2TxtMenu({ setFile , setPlainText , plainPdfText }:{
  setFile: (file: string) => void,
  setPlainText: (text: string) => void,
  plainPdfText: string
}){

  const [ pdfFiles, setPdfFiles ] = useState<string []>([])

  const handleExtractText = ( ) => {
    setPlainText( plainPdfText )
  }

  const handleClearPDF = () => {
    setFile( '' )
  }

  useEffect(() => {
    fetch( pdfFolder )
    .then( response => {
      if( response.ok ) return response.text()  
      throw new Error('Network response was not ok')
    })
    .then( data => {
      const documentList = JSON.parse( convert.xml2json(data, {compact: true, spaces: 2}))
      const fileNames = documentList.ListBucketResult.Contents.map( (document: any) => document.Key._text )
      setPdfFiles( fileNames )
    })
    .catch( error => {
      console.error('There was a problem with the fetch operation:', error)
    })
  },[ pdfFolder, setPdfFiles ])

  return (
    <HStack wrap="wrap" gap="2">
      <Dialog.Root placement='center' motionPreset='slide-in-bottom'>
        <Dialog.Trigger asChild>
          <Button size='sm' variant='outline' >Open PDF</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Select PDF file</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Flex gap="4" wrap="wrap">
                  <For each={ pdfFiles }>
                    { (pdfFile: string) => ( 
                      <Button key={pdfFile} size='md' variant='ghost' onClick={ () => setFile( pdfFolder + pdfFile ) } >{ pdfFile }</Button>
                    )}
                  </For>
                </Flex>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <Button size='sm' variant='outline' onClick={ handleClearPDF }>Clear PDF</Button>
      <Button size='sm' variant='outline' onClick={ handleExtractText }>Extract txt</Button>
      <Button size='sm' variant='outline' >Save txt</Button>
      <Button size='sm' variant='outline' >Open txt</Button>
    </HStack> 
  )  
}