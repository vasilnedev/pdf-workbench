import { JSONSchema7 } from 'json-schema'

export type DocLablel = 
  'DOCUMENT' |
  'ISSUER' |
  'SECTION' | 
  'INFO' | 
  'DEFINITION' | 
  'REQUIREMENT' | 
  'GUIDANCE' | 
  'REFERENCE'

export type LinkLabel =
  'HAS' |
  'ISSUED_BY'

export type Node = {
  node_id: number
  pdfFileName: string
  label: DocLablel
  text: string
}

export type Link = {
  from: number
  to: number
  pdfFileName: string
  label: LinkLabel
}

export type Graph = {
  nodes: Node[]
  links: Link[]
}

export const graphSchema: JSONSchema7 = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Graph",
  "type": "object",
  "required": [ "nodes", "links" ],
  "additionalProperties": false,
  "properties": {
    "nodes": {
      "type": "array",
      "description": "The nodes of the graph",
      "items": { "$ref": "#/$defs/nodes" }
    },
    "links": {
      "type": "array",
      "description": "The links of the graph",
      "items": { "$ref": "#/$defs/links" }
    }
  },
  "$defs": {
    "nodes": {
      "type": "object",
      "required": [ "node_id", "pdfFileName", "label", "text" ],
      "properties": {
        "node_id": {
          "type": "integer",
          "description": "The ID of the node"
        },
        "pdfFileName": {
          "type": "string",
          "description": "The name of the PDF file"
        },
        "label": {
          "type": "string",
          "description": "The label of the node",
          "enum": [
            "DOCUMENT",
            "ISSUER",
            "SECTION",
            "INFO",
            "DEFINITION",
            "REQUIREMENT",
            "GUIDANCE",
            "REFERENCE"
          ]
        },
        "text": {
          "type": "string",
          "description": "The text of the node"
        }
      }
    },
    "links": {
      "type": "object",
      "required": [ "from", "to", "pdfFileName", "label" ],
      "properties": {
        "from": {
          "type": "integer",
          "description": "The ID of the source node"
        },
        "to": {
          "type": "integer",
          "description": "The ID of the target node"
        },
        "pdfFileName": {
          "type": "string",
          "description": "The name of the PDF file"
        },
        "label": {
          "type": "string",
          "description": "The label of the link",
          "enum": [
            "HAS",
            "ISSUED_BY"
          ] 
        }
      }
    }
  }
}

