import { Graph } from './Graph.d'
import neo4j, { Driver, Session } from 'neo4j-driver'

// Neo4j credentials and connection setup
const NEO4J_URI = 'neo4j://bim-app.laptop:7687'
const NEO4J_USER = ''
const NEO4J_PASSWORD = ''

export default async function exportGraphData( json: string ) {
  const driver: Driver = neo4j.driver( NEO4J_URI , neo4j.auth.basic( NEO4J_USER, NEO4J_PASSWORD) )
  const session: Session = driver.session();

  try {  
    const graphData: Graph = JSON.parse( json )

    // Create nodes    
    for (const node of graphData.nodes) {
      const { label } = node;
      await session.run(
        `
        MERGE (n:${label} {node_id: $node_id, pdfFileName: $pdfFileName})
        SET n.text = $text
        `,
        node
      )
    }

    // Create relationships
    for (const link of graphData.links) {
      const { label } = link;
      await session.run(
        `
        MATCH (a {node_id: $from, pdfFileName: $pdfFileName}), (b {node_id: $to, pdfFileName: $pdfFileName})
        MERGE (a)-[r:${label}]->(b)
        `,
        link
      )
    }

  } catch ( error ) {
    throw error
  } finally {
    await session.close()
    await driver.close()
  }
}
