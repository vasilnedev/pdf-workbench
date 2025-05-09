import { useState } from 'react'
import { Theme, Grid, GridItem, Tabs } from '@chakra-ui/react'
import PdfDocument from './components/PdfDocument'
import TxtDocument from './components/TxtDocument'

export default function App(){
  const [ plainText, setPlainText ] = useState<string>('Hello World!')

  return (
    <Theme appearance="dark">
      <Tabs.Root defaultValue="pdf2txt" variant={'enclosed'}>
        <Tabs.List>
          <Tabs.Trigger value="pdf2txt">PDF to TXT</Tabs.Trigger>
          <Tabs.Trigger value="txt2graph">TXT to Graph</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="pdf2txt">
          <Grid
            templateRows="40px 1fr"
            templateColumns="1fr 1fr"
            gap={2}
            padding={0}
            margin={0}
            height={'calc(100vh - 80px)'}
          >
            <GridItem colSpan={2} padding={2} backgroundColor="gray.700">
              <p>Menu bar</p>
            </GridItem>
            <GridItem padding={0} backgroundColor="gray.700" overflow={'auto'}>
              <PdfDocument setPlainText={ setPlainText } />
            </GridItem>
            <GridItem padding={4} backgroundColor="gray.700" overflow={'auto'}>
              <TxtDocument plainText={ plainText } setPlainText={ setPlainText } />
            </GridItem>
          </Grid>
        </Tabs.Content>
        <Tabs.Content value="txt2graph">
          <Grid
            templateRows="40px 1fr"
            templateColumns="1fr 1fr"
            gap={2}
            padding={0}
            margin={0}
            height={'calc(100vh - 80px)'}
          >
            <GridItem colSpan={2} padding={2} backgroundColor="gray.700">
              <p>Menu bar</p>
            </GridItem>
            <GridItem padding={0} backgroundColor="gray.700" overflow={'auto'}>
              <TxtDocument plainText={ plainText } setPlainText={ setPlainText } />
            </GridItem>
            <GridItem padding={4} backgroundColor="gray.700" overflow={'auto'}>
              <p>Graph Viewer</p>
            </GridItem>
          </Grid>          
        </Tabs.Content>
      </Tabs.Root>
    </Theme>
  )
}
