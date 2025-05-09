import { useCallback, useState } from 'react'
import { useResizeObserver } from '@wojtekmaj/react-hooks'
import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

import './PdfDocument.css'

import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
}

export default function PdfDocument({ file, setPlainPdfText }: { 
  file: string, 
  setPlainPdfText: (text: string) => void 
}){

  const resizeObserverOptions = {}
  const maxWidth = 2000

  const [numPages, setNumPages] = useState<number>()
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>()
  const plainTextMap = new Map()

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries
    if (entry) {
      setContainerWidth(entry.contentRect.width)
    }
  }, [])

  useResizeObserver(containerRef, resizeObserverOptions, onResize)

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages( nextNumPages )
  }

  async function onPageLoadSuccess(page: PDFPageProxy): Promise<void> {
    
    const textContent = await page.getTextContent()
    let pageText = '' 
    textContent.items.map( (item: any) => item.str ).forEach( (text: string) => {
      const lastChar = text.slice(-1)
      if (lastChar == '-') {
        pageText += text.slice(0, -1)
      }else if( text == '' ) { 
        pageText += '\n\n'
      }else{
        pageText += text + ' '
      }
    })
    pageText = pageText.replace(/  +/g, ' ')
    plainTextMap.set( page.pageNumber, pageText )
    
    /* 
      Sort the plainTextMap by key and join the values into a single string
    */
    if( numPages && plainTextMap.size == numPages ) {
      let plainPdfText = ''
      const keysReady = Array.from( plainTextMap.keys() ).sort( (a, b) => a > b ? 1 : -1 )
      keysReady.forEach( key => plainPdfText += plainTextMap.get(key) + '\n')
      setPlainPdfText( plainPdfText )
    }
  }

  return (
    <div className="PdfDocument__container__document" ref={setContainerRef}>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
        {Array.from(new Array(numPages), (_el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
            onLoadSuccess={onPageLoadSuccess}
          />
        ))}
      </Document>
    </div>
  )
}
