import convert from 'xml-js'

/*
  isIterable checks if the object is iterable i.e. array, string, Map, Set, etc.
  @param object - The object to check
  @returns true if the object is iterable, false otherwise
*/
const isIterable = (object:any) => object != null && typeof object[Symbol.iterator] === 'function'

/*
  setFileList parses the file list from XML data and updates the file list (an array of file names) state. The parser can return null, an object, or an array of objects.
  isItterable deals with the three cases: null, an object (single file), or an array of objects (multiple files).
  @param data - XML data received from Minio API
  @param fileList - The state setter function to update the file list
*/
const setFileList = ( data:string, fileList: React.Dispatch<React.SetStateAction<string[]>> ) => {
  const documentList = JSON.parse( convert.xml2json(data, {compact: true, spaces: 2}))
  if( isIterable( documentList.ListBucketResult.Contents ) ){
    const fileNames = documentList.ListBucketResult.Contents.map( (document: any) => document.Key._text )
    fileList( fileNames )
  }else if( documentList.ListBucketResult.Contents ) {
    const fileName = documentList.ListBucketResult.Contents.Key._text
    fileList( [fileName] )
  }else{
    throw new Error('No files found in the directory')
  }
}

export { setFileList }
