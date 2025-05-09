import CodeMirror, { EditorView } from '@uiw/react-codemirror'

export default function TxtDocument({ plainText, setPlainText }:{ plainText:string , setPlainText: (text: string) => void}){
  return (
    <CodeMirror
      value={ plainText }
      onChange={ setPlainText }
      height="100%"
      theme={'dark'}
      extensions={[EditorView.lineWrapping]}           
    />
  )
}