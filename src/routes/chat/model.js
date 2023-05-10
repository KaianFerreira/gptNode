import { democrito } from '../../libs/langchain'


export const searchGPTGoogleSearch = async (message) => {
  const { text } = await democrito.call({ question: message })
  return text
}