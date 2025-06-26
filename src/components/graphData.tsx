import { Graph } from './Graph.d'
import neo4j, { Driver, Session } from 'neo4j-driver'
import { Neo4jGraph } from '@langchain/community/graphs/neo4j_graph'
import { ChatOpenAI } from '@langchain/openai'
import { ChatDeepSeek } from '@langchain/deepseek'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { GraphCypherQAChain } from '@langchain/community/chains/graph_qa/cypher'
import { OPENAI_API_KEY , DEEPSEEK_API_KEY , GEMINI_API_KEY } from './secrets'

// Neo4j credentials and connection setup
const NEO4J_URI = 'neo4j://' + window.location.hostname + ':7687'
const NEO4J_USER = ''
const NEO4J_PASSWORD = ''

export async function queryGraph( query: string ) {
  const graph = await Neo4jGraph.initialize( {
    url: NEO4J_URI, 
    username: NEO4J_USER, 
    password: NEO4J_PASSWORD
  } )
  await graph.refreshSchema()
  console.log( graph.getSchema() )

  const openAI_model = new ChatOpenAI({ 
    model: "gpt-3.5-turbo",
    apiKey: OPENAI_API_KEY,
    maxTokens: 1000, 
    temperature: 0 
  })

  const deepseek_model = new ChatDeepSeek({
    apiKey: DEEPSEEK_API_KEY,
    model: "deepseek-chat",
  })

  /*
    Using Google Gemini AI is not working at the moment - thows an error:
    "Error processing query: this.llm.pipe is not a function"
  */
  const geminiAI = new GoogleGenerativeAI( GEMINI_API_KEY )
  const geminiAI_model = geminiAI.getGenerativeModel( {
    model: 'gemini-1.5-flash'
  } ) as any
  
  const chain = GraphCypherQAChain.fromLLM({
    llm: openAI_model, // openAI_model, deepseek_model, or geminiAI_model
    graph,
  })
  const response = await chain.invoke({ query })
  
  return response.result
}

export async function exportGraphData( json: string ) {
  const driver: Driver = neo4j.driver( NEO4J_URI , neo4j.auth.basic( NEO4J_USER, NEO4J_PASSWORD) )
  const session: Session = driver.session();

  try {  
    const graphData: Graph = JSON.parse( json )

    // Create nodes    
    for (const node of graphData.nodes) {
      const { labels } = node
      await session.run(
        `
        MERGE (n:${labels.join(':')} {node_id: $node_id, pdfFileName: $pdfFileName})
        SET n.text = $text
        `,
        node
      )
    }

    // Create relationships
    for (const link of graphData.links) {
      const { label } = link
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
