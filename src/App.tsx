import { useState } from 'react'
import { Theme, Tabs } from '@chakra-ui/react'
import Pdf2TxtTab from './components/Pdf2TxtTab'
import Txt2GraphTab from './components/Txt2GraphTab'

export default function App(){

  const [ plainPdfText, setPlainPdfText ] = useState<string>('')
  const [ plainText, setPlainText ] = useState<string>('')

  return (
    <Theme appearance="dark">
      <Tabs.Root defaultValue="pdf2txt" variant={'line'}>
        <Tabs.List>
          <Tabs.Trigger value="pdf2txt">PDF to TXT</Tabs.Trigger>
          <Tabs.Trigger value="txt2graph">TXT to Graph</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="pdf2txt">
          <Pdf2TxtTab
            plainPdfText={ plainPdfText }
            setPlainPdfText={ setPlainPdfText }
            plainText={ plainText }
            setPlainText={ setPlainText }
          />
        </Tabs.Content>
        <Tabs.Content value="txt2graph">
          <Txt2GraphTab
            plainText={ plainText }
            setPlainText={ setPlainText }
          />          
        </Tabs.Content>
      </Tabs.Root>
    </Theme>
  )
}
