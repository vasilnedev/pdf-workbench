import { useEffect, useState } from 'react'
import { Button, HStack, Flex, CloseButton, Dialog, Portal, For, Text , Checkbox } from '@chakra-ui/react'
import { setFileList } from './utils'
import { pdfFolder, txtFolder } from './constants'

export default function Pdf2TxtMenu({ pdfFileName, setPdfFileName, renderPdf , setRenderPdf, plainTextFromPdf,setPlainText }:{
  pdfFileName: string,
  setPdfFileName: (text: string) => void,
  renderPdf: boolean,
  setRenderPdf: (value: boolean) => void,
  plainTextFromPdf: string,
  setPlainText: (text: string) => void
}){

  const [ pdfFiles, setPdfFiles ] = useState<string []>([])

  const handleExtractText = ( ) => {
    setPlainText( plainTextFromPdf )
  }

  useEffect(() => {
    fetch( pdfFolder )
    .then( response => {
      if( response.ok ) return response.text()  
      throw new Error('Network response was not ok')
    })
    .then( data => setFileList( data, setPdfFiles ))
    .catch( error => console.error('There was a problem with the fetch operation:', error))
  },[])

  return (
    <HStack wrap="wrap" gap="1">
      <Text paddingX={2}>{ ( pdfFileName ) ? pdfFileName : 'No PDF selected' }</Text>
      <Dialog.Root placement='center' motionPreset='slide-in-bottom'>
        <Dialog.Trigger asChild>
          <Button size='sm' variant='outline' >Select PDF</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>PDF files</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Flex gap="4" wrap="wrap">
                  <For each={ pdfFiles }>
                    { ( pdfFile: string ) => ( 
                      <Button 
                        key={ pdfFile } 
                        size='md' 
                        variant='ghost' 
                        onClick={ () => setPdfFileName( pdfFile ) } 
                      >
                        { pdfFile }
                      </Button>
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
      <Checkbox.Root
        paddingX={2}
        checked={ renderPdf}
        onCheckedChange={(e) => setRenderPdf(!!e.checked)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>View PDF</Checkbox.Label>
      </Checkbox.Root>
      <Button size='sm' variant='outline' onClick={ handleExtractText } disabled={!renderPdf} >Extract TXT</Button> 
    </HStack> 
  )  
}