import { useState } from 'react'
import { Theme, Tabs } from '@chakra-ui/react'
import Pdf2TxtTab from './components/Pdf2TxtTab'
import Txt2GraphTab from './components/Txt2GraphTab'
import { Toaster } from "@/components/ui/toaster"

export default function App(){

  const [ pdfFileName, setPdfFileName ] = useState<string>('')
  const [ plainText, setPlainText ] = useState<string>('')
  const [ graphJSON, setGraphJSON ] = useState<string>('')

  return (
    <Theme appearance="dark">
      <Toaster />
      <Tabs.Root defaultValue="pdf2txt" variant={'line'}>
        <Tabs.List>
          <Tabs.Trigger value="pdf2txt">PDF to TXT</Tabs.Trigger>
          <Tabs.Trigger value="txt2graph" visibility={ ( pdfFileName.length > 0 ? 'visible' : 'hidden' )}>TXT to Graph</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="pdf2txt">
          <Pdf2TxtTab
            pdfFileName={ pdfFileName }
            setPdfFileName={ setPdfFileName }
            plainText={ plainText }
            setPlainText={ setPlainText }
          />
        </Tabs.Content>
        <Tabs.Content value="txt2graph">
          <Txt2GraphTab
              pdfFileName={ pdfFileName }
              plainText={ plainText }
              setPlainText={ setPlainText }
              graphJSON={ graphJSON }
              setGraphJSON={ setGraphJSON }
            /> 
        </Tabs.Content>
      </Tabs.Root>
    </Theme>
  )
}

