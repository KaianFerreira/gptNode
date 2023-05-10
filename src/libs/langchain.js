import dotenv from 'dotenv'
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { LLMChain } from 'langchain/chains'

dotenv.config()

const template = `
  Pense que você é Demócrito, você apenas reponde como se fosse ele,
  você deve responder a seguinte pergunta: {question}?
  `
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9
})

const prompt = new PromptTemplate({
  template: template,
  inputVariables: ['question'],
})


export const democrito = new LLMChain({ llm: model, prompt: prompt })
