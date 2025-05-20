import CodeMirror, { EditorView } from '@uiw/react-codemirror'
import { langs } from '@uiw/codemirror-extensions-langs'
import { jsonSchema } from 'codemirror-json-schema'
import { graphSchema } from './Graph.d'

function TxtDocument({ plainText, setPlainText }:{ plainText:string , setPlainText: (text: string) => void}){
  return (
    <CodeMirror
      value={ plainText }
      onChange={ setPlainText }
      height="100%"
      theme={'dark'}
      placeholder="Press Extract TXT button to extract text from PDF."
      extensions={[EditorView.lineWrapping]}
    />
  )
}

function JSONDocument({ graphJSON, setGraphJSON }:{ graphJSON:string , setGraphJSON: (text: string) => void }){
  return (
    <CodeMirror
      value={ graphJSON }
      onChange={ setGraphJSON }
      height="100%"
      theme={'dark'}
      placeholder="Press Create Gpah JSON button to create a Graph object."
      extensions={[EditorView.lineWrapping, langs.json(), jsonSchema( graphSchema )]}
    />
  )
}

export { TxtDocument, JSONDocument }
export default null
