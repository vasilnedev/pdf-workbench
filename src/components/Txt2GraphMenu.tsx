import { Button, HStack, Text } from '@chakra-ui/react'
import { txtFolder } from './constants'
import { toaster } from "@/components/ui/toaster"
import { graphSchema, Graph, Node, Link, DocLablel } from './Graph.d'
import Validator from 'jsonschema'
import exportGraphData from './exportGraphData'

export default function Pdf2TxtMenu({ pdfFileName, plainText , setPlainText, graphJSON, setGraphJSON }:{
  pdfFileName: string,
  plainText: string,
  setPlainText: (text: string) => void,
  graphJSON: string,
  setGraphJSON: (json: string) => void
}){

  const handleSaveFile = ( extension: string ) => {
    if( !pdfFileName || pdfFileName.length === 0 ) return
    fetch( txtFolder + pdfFileName + extension, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: (extension == '.txt') ? plainText : graphJSON
    })
    .then( response => {
      if( response.ok ) {
        toaster.create({
          title: `${ pdfFileName + extension } save success!`,
          type: 'success',
        })
      } else {
        throw new Error( 'Error saving file:'+ response.statusText )
      }
    })
    .catch( error => {
      console.error('Error saving file:', error)
      toaster.create({
        title: `${ pdfFileName + extension } save fail!`,
        type: 'error',
      })
    })
  }

  const handleOpenFile = ( extension: string ) => {
    if( !pdfFileName || pdfFileName.length === 0 ) return
    fetch( txtFolder + pdfFileName + extension )
    .then( response => {
      if( response.ok ) return response.text()  
      throw new Error('Network response was not ok')
    })
    .then( data => {
      if( extension == '.txt' ){
        setPlainText( data )
      }else{
        setGraphJSON( data )
      }
      toaster.create({
        title: `${ pdfFileName + extension } load success!`,
        type: 'success',
      })
    })
    .catch( error => {
      console.error('There was a problem with the fetch operation:', error)
      toaster.create({
        title: `${ pdfFileName + extension } load fail!`,
        type: 'error',
      })
    })
  }


  const handleCreateJSON = () => {
    
    let graph: Graph = {
      nodes:[] as Node[],
      links:[] as Link[]
    }

    let id = 1
    for( const para of plainText.split('\n\n') ) {
      if( para.trim().length != 0){
        let label: DocLablel = 'INFO'
        if( id == 1){ label='DOCUMENT' }
        else if( para.includes(' shall ') ){ label='REQUIREMENT' }
        else if( para.includes(' should ') ){ label='GUIDANCE' }
        else if( para.startsWith('[') ){ label='REFERENCE' }
        graph.nodes.push( {
          node_id:id,
          pdfFileName,
          label,
          text: para
        } )
        if( id > 1 ){
          graph.links.push({
            from:1,
            to:id,
            pdfFileName,
            label: 'HAS'
          })
        }
        id++
      } 
    }
    setGraphJSON( JSON.stringify( graph , null , 2 ) )
  }

  const handleValidateJSON = () => {
    try {
      const validator = new Validator.Validator()
      const validationResult = validator.validate( 
        JSON.parse( graphJSON ), 
        graphSchema as Validator.Schema,
        { base: 'http://localhost' } 
      )
      if( validationResult.valid ) {
        toaster.create({
          title: 'Graph JSON is valid',
          type: 'success',
        })
      } else {
        throw new Error( validationResult.errors.map( (error: any) => error.message ).join(', ') )
      }
    } catch ( e: any ) {
      toaster.create({
        title: e.message,
        type: 'error',
      })
    }
  }

  const handleExportGraph = () => {
    try {
      exportGraphData( graphJSON )
      toaster.create({
        title: 'Graph imported successfully',
        type: 'success',
      })
    }
    catch ( error ) {
      toaster.create({
        title: 'Graph import failed',
        type: 'error',
      })
    }
  }

  return (
    <HStack wrap="wrap" gap="1">
      <Text paddingX={2}>{ ( pdfFileName ) ? pdfFileName : 'No PDF selected' }</Text>
      <Button size='sm' variant='outline' onClick={ () => handleOpenFile( '.txt' ) } >Load TXT</Button>
      <Button size='sm' variant='outline' onClick={ () => handleSaveFile( '.txt' )} >Save TXT</Button>
      <Button size='sm' variant='outline' onClick={ handleCreateJSON } >Create Graph JSON</Button>
      <Button size='sm' variant='outline' onClick={ handleValidateJSON } >Validate Graph JSON</Button>
      <Button size='sm' variant='outline' onClick={ () => handleOpenFile( '.json' ) } >Load JSON</Button>
      <Button size='sm' variant='outline' onClick={ () => handleSaveFile( '.json' )} >Save JSON</Button>
      <Button size='sm' variant='outline' onClick={ handleExportGraph } >Expoert Graph</Button>
    </HStack> 
  )  
}
